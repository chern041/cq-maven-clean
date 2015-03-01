/**
 * @class apps.siteworx.MultiFieldLimit
 * @extends CQ.form.CompositeField
 * The MultiField is an editable list of form fields for editing
 * multi-value properties with the limit functionality
 * @constructor
 * Creates a new MultiField.
 * @param {Object} config The config object
 */
SWX.MultiFieldLimit = CQ.Ext.extend(CQ.form.MultiField, {

    fieldConfig: null,

    limit:10, 
    
    // private
    path: "",

    // private
    bodyPadding: 4,

    // the width of the field
    // private
    fieldWidth: 0,

    constructor: function(config) {
        var list = this;
        limit = config.limit;
        
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
        config.fieldConfig.orderable = config.orderable;

        var items = new Array();

        if(config.readOnly) {
            //if component is defined as readOnly, apply this to all items
            config.fieldConfig.readOnly = true;
        } else {
            items.push({
                "xtype":"button",
                "cls": "cq-multifield-btn",
                "text":"Add",
                "handler":function() {
                    list.addItem();
                }
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
            "change"
        );
    },

    initComponent: function() {
        CQ.form.MultiField.superclass.initComponent.call(this);

        this.on("resize", function() {
            // resize fields
            var item = this.items.get(0);
            this.calculateFieldWidth(item);
            if (this.fieldWidth > 0) {
                for (var i = 0; i < this.items.length; i++) {
                    try {
                        this.items.get(i).field.setWidth(this.fieldWidth);
                    }
                    catch (e) {
                        CQ.Log.debug("CQ.form.MultiField#initComponent: " + e.message);
                    }
                }
            }
        });

        this.on("disable", function() {
            this.hiddenDeleteField.disable();
            if (this.typeHintField) this.typeHintField.disable();
            this.items.each(function(item/*, index, length*/) {
                if (item instanceof CQ.form.MultiField.Item) {
                    item.field.disable();
                }
            }, this);
        });

        this.on("enable", function() {
            this.hiddenDeleteField.enable();
            if (this.typeHintField) this.typeHintField.enable();
            this.items.each(function(item/*, index, length*/) {
                if (item instanceof CQ.form.MultiField.Item) {
                    item.field.enable();
                }
            }, this);
        });
    },

    // private
    calculateFieldWidth: function(item) {
        try {
            this.fieldWidth = this.getSize().width - 2*this.bodyPadding; // total row width
            for (var i = 1; i < item.items.length; i++) {
                // subtract each button
                var w = item.items.get(i).getSize().width;
                if (w == 0) {
                    // button has no size, e.g. because MV is hidden >> reset fieldWidth to avoid setWidth
                    this.fieldWidth = 0;
                    return;
                }

                this.fieldWidth -= item.items.get(i).getSize().width;
            }
        }
        catch (e) {
            // initial resize fails if the MF is on the visible first tab
            // >> reset to 0 to avoid setWidth
            this.fieldWidth = 0;
        }
    },

    /**
     * Adds a new field with the specified value to the list.
     * @param {String} value The value of the field
     */
    addItem: function(value) {
        console.log(this);
        var index = -1;
        var itemCount = 0;
        this.items.each(function(item) {
            index++; 
            if (item instanceof CQ.form.MultiField.Item) {
                itemCount++;
                console.log(item);
            }
        }, this);
        
        if(itemCount < limit) {
            console.log("trying to add");
            var item = this.insert(this.items.getCount() - 1, {});
            
            console.log("trying to find parent form");
            console.log(this.findParentByType("form"));
            this.findParentByType("form").getForm().add(item.field);
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
        }
    },
    
    processPath: function(path) {
        this.path = path;
    },

    // overriding CQ.form.CompositeField#getValue
    getValue: function() {
        var value = new Array();
        this.items.each(function(item, index/*, length*/) {
            if (item instanceof CQ.form.MultiField.Item) {
                value[index] = item.getValue();
                index++;
            }
        }, this);
        return value;
    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {
        this.fireEvent("change", this, value, this.getValue());
        var oldItems = this.items;
        oldItems.each(function(item/*, index, length*/) {
            if (item instanceof CQ.form.MultiField.Item) {
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

CQ.Ext.reg("swxmultifieldlimit", SWX.MultiFieldLimit);