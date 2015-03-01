/**
 *  SWX StructuredMultiField
 *  An extension of the ExtJS MultiField component.
 *  
 *  If orderable, forces drag drop mode.
 *  Accepts a parameter, baseNode.
 *  Persists data as individual nodes beneath baseNode, according to 
 *  the fileReferencePrefix naming conventions.
 *
 *  Should be configured with a fieldConfig node of type dialogFieldSet,
 *  containing a cq:WidgetCollection node with a collection of children
 *  fields.  
 *  
 *  See CQ.form.MultiField for further documentation.
 *
**/

/**
 * @class SWX.StructuredMultiField
 * @extends CQ.form.MultiField
 * @constructor
 * Creates a new StructuredMultiField.
 * @param {Object} config The config object
 */
SWX.StructuredMultiField = CQ.Ext.extend(CQ.form.MultiField, {

    baseNode: "multi",

    fileReferencePrefix: null,

    initNumRecords: 0,

    constructor: function(config) {
        config = CQ.Util.applyDefaults(config, {
            "defaults": {
                "xtype": "structuredmultifielditem",
                "fileReferencePrefix": "./set$",
                "baseNode": "multi",
                "allowReference": true,
                "fieldConfig": config.fieldConfig
            }
        });
        //SWX.StructuredMultiField.superclass.constructor.call(this, config);
        
        var list = this;

        if (typeof config.orderable === "undefined") {
            config.orderable = true;
        }

        if (!config.fieldConfig) {
            config.fieldConfig = {};
        }
        if (!config.fieldConfig.xtype) {
            config.fieldConfig.xtype = "textfield";
        }
        config.fieldConfig.name = config.name;
        config.fieldConfig.ownerCt = this;
//        config.fieldConfig.style = "width:95%;";
        config.fieldConfig.orderable = config.orderable;
        config.fieldConfig.dragDropMode = config.dragDropMode;
        if (!config.addItemLabel) {
            config.addItemLabel = CQ.I18n.getMessage("Add Item");
        }

        var items = new Array();

        if(config.readOnly) {
            //if component is defined as readOnly, apply this to all items
            config.fieldConfig.readOnly = true;
        } else if (config.fieldConfig.orderOnly) {
        	config.orderOnly = true;
        } else {
            items.push({
                xtype: "toolbar",
                cls: "cq-multifield-toolbar",
                items: [
                    "->",
                    {
                        xtype: "textbutton",
                        text: config.addItemLabel,
                        style: "padding-right:6px",
                        handler:function() {
                            list.addItem();
                        }
                    },
                    {
                        xtype: "button",
                        iconCls: "cq-multifield-add",
                        template: new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                        handler: function() {
                            list.addItem();
                        }
                    }
                ]
            });
        }

        this.hiddenDeleteField = new CQ.Ext.form.Hidden({
            "name":config.name + CQ.Sling.DELETE_SUFFIX
        });
        items.push(this.hiddenDeleteField);

        if (config.typeHint) {
            this.typeHintField = new CQ.Ext.form.Hidden({
                name: config.name + CQ.Sling.TYPEHINT_SUFFIX,
                value: config.typeHint + "[]"
            });
            items.push(this.typeHintField);
        }

        config = CQ.Util.applyDefaults(config, {
            "defaults":{
                "xtype":"multifielditem",
                "fieldConfig":config.fieldConfig
            },
            "items":[
                {
                    "xtype":"panel",
                    "border":false,
                    "bodyStyle":"padding:" + this.bodyPadding + "px",
                    "items":items
                }
            ]
        });
        CQ.form.MultiField.superclass.constructor.call(this,config);
        if (this.defaults.fieldConfig.regex) {
            // somehow regex get broken in this.defaults, so fix it
            this.defaults.fieldConfig.regex = config.fieldConfig.regex;
        }
        this.addEvents(
            /**
             * @event change
             * Fires when the value is changed.
             * @param {CQ.form.MultiField} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            "change",
            /**
             * @event removeditem
             * Fires when an item is removed.
             * @param {CQ.form.MultiField} this
             */
            "removeditem"
        );
        
        
        
    },

    onBeforeSubmit: function() {
        this.removeOldInterface();
        this.createInterface(this.el);
        return true;
    },

    createInterface: function(ct) {
        if (!this.interfaceFields) {
            this.interfaceFields = [];
        } else {
            this.interfaceFields.length = 0;
        }

        var fields = this.createTransferFields(this.fileReferencePrefix);
        var fieldCnt = fields.length;
        for (var fieldIndex = 0; fieldIndex < fieldCnt; fieldIndex++) {
            var field = fields[fieldIndex];
            field.render(ct);
            this.interfaceFields.push(field);
        }
    },

    removeOldInterface: function() {
        if (this.interfaceFields) {
            var fieldCnt = this.interfaceFields.length;
            for (var fieldIndex = 0; fieldIndex < fieldCnt; fieldIndex++) {
                var field = this.interfaceFields[fieldIndex];
                field.getEl().remove();
            }
            this.interfaceFields.length = 0;
        }
    },

    createTransferFields: function(prefix) {
        var fields = [];
        var index = 0;
        prefix = prefix.replace("./","").replace("$","");
        var separatedNodes = prefix.split("/");
        var holder = separatedNodes.pop();
        separatedNodes.push(this.baseNode);
        separatedNodes.push(holder);
        separatedNodes.reverse();
        var basicName = ".";
        while (separatedNodes.length > 0) {
            basicName = basicName + "/" + separatedNodes.pop();
        }
        this.items.each(function(item, i) {
            if (item instanceof SWX.StructuredMultiField.Item) {
                index++;
                item.field.items.each(function(f, j) {
                    var name = basicName + index + "/" + f.getName().replace("./", "");
                    var value = f.getValue();
                    fields.push(new CQ.Ext.form.Hidden({
                        "name": name,
                        "value": value
                    }));
                    f.disable();
                }, "");
            }
        }, this);

        // delete old records beyond current ones
        for (var i = (index + 1); i <= this.initNumRecords; i = i + 1) {
            var deletePrm = basicName + i + CQ.Sling.DELETE_SUFFIX;
            fields.push(new CQ.Ext.form.Hidden({
                "name": deletePrm,
                "value": ""
            }));
        }
        return fields;
    },

    processRecord: function(record, path) {
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            //var setName = this.fileReferencePrefix.replace("./", "").replace("$", "");
            var setName = this.fileReferencePrefix.replace("./", "").replace("$", "");
            var separatedNodes = setName.split("/");
            var holder = separatedNodes.pop();
            separatedNodes.push(this.baseNode);
            separatedNodes.push(holder);
            separatedNodes = separatedNodes.reverse();
            
            var oldItems = this.items;
            oldItems.each(function(item) {
                if (item instanceof SWX.StructuredMultiField.Item) {
                    item.field.items.each(function(a) {
                        //this.findParentByType("form").getForm().remove(a);
                    }, "");

                    this.remove(item, true);
                    this.findParentByType("form").getForm().remove(item);
                }
            }, this);
            this.initNumRecords = 0;
            
            var data = record.data;
            while (separatedNodes.length > 1) {
                var curNode = separatedNodes.pop();
                for (var key in data) {
                    if (key == curNode) {
                        var toEval = "data." + key;
                        data = eval(toEval);
                    }
                }
            }

            var targetString = separatedNodes.pop();
            for (var key in data) {
                if (key.indexOf(targetString) >= 0) {
                    var values = eval("data."+key);
                    var item = this.insert(this.items.getCount() - 1, {});
                    item.field.items.each(function(a, j) {
                       var n = a.getName().replace("./", "");
                       var v = values[n];
                       a.setValue(v);
                    }, "");
                    this.initNumRecords++;
                }
            }
            this.doLayout();
            this.fireEvent('loadcontent', this, record, path);
        }
    },

    // overriding CQ.Ext.Panel#onRender
    onRender: function(ct, pos) {
        SWX.StructuredMultiField.superclass.onRender.call(this, ct, pos);
        var frm = this.findParentByType("form").getForm();
        frm.on("beforeaction", function() {
            //this.syncFormElements();
            return this.onBeforeSubmit();
        }, this);
    },

    addItem: function(value) {
        var item = this.insert(this.items.getCount() - 1, {});
        var form = this.findParentByType("form");
        if (form) {
            //here, we should be adding the dialogFieldSet's items to the form
            //rather than the dialogFieldSet itself
            if (item.field.xtype === "dialogfieldset") {
                var itms = item.field.items.items;
                for (var fld = 0; fld < itms.length; fld++) {
                    form.getForm().add(itms[fld]);
                }
            } else {
                form.getForm().add(item.field);
            }
        }
        this.doLayout();

        if (item.field.processPath) item.field.processPath(this.path);
        if (value) {
            item.setValue(value);
        }

        if (this.fieldWidth < 0) {
            // fieldWidth is < 0 when e.g. the MultiField is on a hidden tab page;
            // do not set width but wait for resize event triggered when the tab page is shown
            return;
        }
        if (!this.fieldWidth) {
            this.calculateFieldWidth(item);
        }
        try {
            item.field.setWidth(this.fieldWidth);
        }
        catch (e) {
            CQ.Log.debug("CQ.form.MultiField#addItem: " + e.message);
        }
    },

    // overriding CQ.form.CompositeField#getValue
    getValue: function() {
        var value = new Array();
        this.items.each(function(item, index) {
            if (item instanceof SWX.StructuredMultiField.Item) {
                var fieldValue = new Array();
                item.field.items.each(function(a, j) {
                    fieldValue[j] = a.getValue();
                    j++;
                }, "");
                value[index] = fieldValue;
                index++;
            }
        }, this);
        this.doLayout();
        return value;
    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {
        this.fireEvent("change", this, value, this.getValue());
        var oldItems = this.items;
        oldItems.each(function(item) {
            if (item instanceof SWX.StructuredMultiField.Item) {
                // CUSTOM
                item.field.items.each(function(a) {
                    //this.findParentByType("form").getForm().remove(a);
                }, "");

                this.remove(item, true);
                this.findParentByType("form").getForm().remove(item);
            }
        }, this);
        this.doLayout();
        if ((value != null) && (value != "")) {
            if (value instanceof Array || CQ.Ext.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    this.addItem(value[i]);
                }
            } else {
                this.addItem(value);
            }
        }
    }
});
CQ.Ext.reg("structuredmultifield", SWX.StructuredMultiField);

/**
 * @private
 * @class SWX.StructuredMultiField.Item
 * @extends CQ.form.MultiField.Item
 * The StructuredMultiField.Item is an item in the {@link SWX.StructuredMultiField}.
 * This class is not intended for direct use.
 * @constructor
 * Creates a new StructuredMultiField.Item.
 * @param {Object} config The config object
 */
SWX.StructuredMultiField.Item = CQ.Ext.extend(CQ.form.MultiField.Item, {

    constructor: function(config) {
        if (config.fieldConfig.orderable) {
            config.fieldConfig.dragDropMode = true;
        }
        SWX.StructuredMultiField.Item.superclass.constructor.call(this, config);
    },
    
    constructDrapDropConfig: function(items, fieldConfig) {
        var item = this;

        this.field = CQ.Util.build(fieldConfig, true);

        if (!fieldConfig.readOnly) {
            if (fieldConfig.orderable) {
                var move = CQ.Util.build({
                    "xtype":"button",
                    "iconCls": "cq-multifield-drag-handle",
                    "template": new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>')
                }, true);

                items.push(move);

                move.on("render", function() {
                    move.dragZone = new CQ.Ext.dd.DragZone(move.getEl(), {
                        item: item,
                        ddGroup: fieldConfig.name,
                        getDragData: function(e) {
                            var sourceEl = move.ownerCt.getEl();
                            sourceEl.setVisibilityMode(CQ.Ext.Element.DISPLAY);
                            if (sourceEl) {
                                d = sourceEl.dom.cloneNode(true);
                                d.id = CQ.Ext.id();
                                return {
                                    ddel: d,
                                    sourceEl: sourceEl,
                                    repairXY: CQ.Ext.fly(sourceEl).getXY()
                                }
                            }
                        },

                        getRepairXY: function() {
                            return this.dragData.repairXY;
                        },

                        onDrag: function() {
                            item.dropTarget.lock();
                        },

                        onInvalidDrop: function(target, e, id) {
                            CQ.Ext.dd.DragZone.superclass.onInvalidDrop.call(this,target, e, id);
                            item.dropTarget.unlock();
                        }
                    });
                });

                this.field.on("render", function() {
                    item.createDropTarget();
                })
            }
        }

        items.push({
            "xtype":"panel",
            "border":false,
            "cellCls":"cq-multifield-itemct",
//            "width": 100,
            "items":item.field
        });

        if (!fieldConfig.readOnly && !fieldConfig.orderOnly) {
            items.push({
                "xtype":"panel",
                "border":false,
                "items":{
                    "xtype":"button",
                    "iconCls": "cq-multifield-remove",
                    "template": new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                    "handler":function() {
                        var parent = item.ownerCt;
                        parent.remove(item);
                        parent.fireEvent("removeditem", parent);
                    }
                }
            });
        }
    },

    getValue: function() {
        var value = [];
        this.field.items.each(function(a, j) {
            value[j] = a.getValue();
            j++;
        }, "");
        return value;
    },

    setValue: function(value) {
        this.field.items.each(function(a, j) {
            a.setValue(value[j]);
            j++;
        }, "");
    },

    reorder: function(item) {
        var value=item.getValue();
        item.setValue(this.getValue());
        this.setValue(value);
    },

    createDropTarget: function() {
        if( !this.field ) {
            return;
        }
        if( this.dropTarget ) {
            this.dropTarget.destroy();
        }

        var item = this;

        if (!this.field.name)
            console.log("name isnt set!");

        this.dropTarget = new CQ.Ext.dd.DropTarget(this.getEl(), {
            item: item,
            ddGroup : this.field.name,

            getPosition: function(e, element) {
                var y = e.getXY()[1];
                var region = CQ.Ext.fly(element).getRegion();
                var h = region.bottom - region.top;
                var ypos = region.bottom - y;

                if ( ypos >= (h / 2)) {
                    return "before";
                } else {
                    return "after";
                }
            },

            showTargetLine: function(el, position) {
                var extra = 2;
                var region = CQ.Ext.fly(el).getRegion();
                var x = region.left;
                var y = region.bottom - 1;
                if (position == "before") {
                    //display target obj before drop target
                    y = region.top - 1;
                }

                CQ.form.MultiField.getTargetLine().setWidth(el.getWidth());
                CQ.form.MultiField.getTargetLine().show();
                CQ.form.MultiField.getTargetLine().setPosition(x,y)
            },

            notifyOver : function(draggedObj, e, data){
                this.lastPosition =  this.getPosition(e, this.el);
                this.showTargetLine(this.el, this.lastPosition);
                return this.dropAllowed;
            },

            notifyOut : function(draggedObj, e, data){
                CQ.form.MultiField.getTargetLine().hide();
                if(this.overClass){
                    this.el.removeClass(this.overClass);
                }
            },

            notifyDrop : function(draggedObj, e, data){
                CQ.form.MultiField.getTargetLine().hide();

                var movingItem = draggedObj.item;
                var toItem = this.item;

                movingItem.move(toItem, this.lastPosition);
                return true;
            }
        });
    },
    
     move: function(toItem, position) {
        var movingItem = this;
        var parent = movingItem.ownerCt;

        var index = parent.items.indexOf(toItem);

        index = index == -1 ? 0 : index;
        index = index > parent.items.getCount() ? parent.items.getCount() : index;

        parent.items.insert(index, movingItem);

        if( position == "before") {
            movingItem.getEl().insertBefore(toItem.getEl());
        } else {
            movingItem.getEl().insertAfter(toItem.getEl());
        }

        movingItem.createDropTarget();

        parent.doLayout(false, true);
    }
});
CQ.Ext.reg("structuredmultifielditem", SWX.StructuredMultiField.Item);