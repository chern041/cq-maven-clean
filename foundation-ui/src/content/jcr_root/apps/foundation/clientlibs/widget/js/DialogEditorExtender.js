CQ.DialogEditor.DD_GROUP = "cq.dialogeditor";
CQ.DialogEditor.DEFAULT_FIELD_TYPE = "textfield";
CQ.DialogEditor.PROP_PREFIX = "prop";

CQ.DialogEditor.NT_CQ_NS_PREFIX = "cq:";
CQ.DialogEditor.NT_DIALOG = CQ.DialogEditor.NT_CQ_NS_PREFIX + "Dialog";
CQ.DialogEditor.NT_COLLECTION = CQ.DialogEditor.NT_CQ_NS_PREFIX + "WidgetCollection";
CQ.DialogEditor.NT_TABPANEL = CQ.DialogEditor.NT_CQ_NS_PREFIX + "TabPanel";
CQ.DialogEditor.NT_PANEL = CQ.DialogEditor.NT_CQ_NS_PREFIX + "Panel";

CQ.DialogEditor.NT_JCR_NS_PREFIX = "jcr:";
CQ.DialogEditor.JCR_PRIMARY_TYPE = CQ.DialogEditor.NT_JCR_NS_PREFIX + "primaryType";

CQ.DialogEditor.CONTAINER = CQ.I18n.getMessage("Container");
CQ.DialogEditor.FIELD = CQ.I18n.getMessage("Fields");
CQ.DialogEditor.BUTTON = CQ.I18n.getMessage("Buttons");
CQ.DialogEditor.TOGGLE = CQ.I18n.getMessage("Toggle");
CQ.DialogEditor.LIST = CQ.I18n.getMessage("List");
CQ.DialogEditor.STATIC = CQ.I18n.getMessage("Static");
CQ.DialogEditor.DYNAMIC = CQ.I18n.getMessage("Dynamic");

CQ.DialogEditor.MAPPINGS = {
        
    /***********************************************************************************
     * Container
     **********************************************************************************/
    dialog: {
        hideInList: true,
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Dialog"),
        insertCfg: {
            "jcr:primaryType": "cq:Dialog",
            xtype: "dialog",
            title: "Dialog",
            
            items: {
                "jcr:primaryType": "cq:WidgetCollection"
            }
        },
        propList: {
            title: "",
            width: "",
            height: "",
            okText: "",
            cancelText: ""
        },
        allowedChilds: ["tabpanel", "panel", "widgetcollection", "buttons", "cqinclude"]
    },
    
    tabpanel: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Tab Panel"),
        insertCfg: {
            xtype: "tabpanel"
        },
        propsList: {
            width: "",
            height: "",
            border: false
        },
        allowedChilds: ["panel", "widgetcollection", "buttons", "cqinclude", "mixinpanel"]
    },
    
    panel: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Panel"),
        insertCfg: {
            "jcr:primaryType": "cq:Panel",
            xtype: "panel",
            title: "Panel"
        },
        propList: {
            title: "",
            width: "",
            height: "",
            border: false
        },
        allowedChilds: ["textfield", "textarea", "numberfield", "combo", "hidden", "richtext", "password", "componentselector",
                        "multifield", "tableedit2", "checkbox", "radio", "selection", "label", "fileuploadfield",
                        "dialogfieldset", "sizefield", "datetime", "static", "tags", "paragraphreference", 
                        "pathfield", "colorfield", "colorlist", "cqinclude", "structuredmultifield"]
    },
    
    mixinpanel: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Mixin Panel"),
        insertCfg: {
            "jcr:primaryType": "cq:Panel",
            xtype: "mixinpanel",
            title: "Mixin Panel"
        },
        propList: {
            title: "",
            width: "",
            height: "",
            border: false
        },
        allowedChilds: ["textfield", "textarea", "numberfield", "combo", "hidden", "richtext", "password", "componentselector",
                        "multifield", "tableedit2", "checkbox", "radio", "selection", "label", "fileuploadfield",
                        "dialogfieldset", "sizefield", "datetime", "static", "tags", "paragraphreference", 
                        "pathfield", "colorfield", "colorlist", "cqinclude", "structuredmultifield"]
    },
    
    widgetcollection: {
        hideInList: true,
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Widget Collection"),
        insertCfg: {
            "jcr:primaryType": "cq:WidgetCollection"
        },
        propList: {},
    },
    
    buttons: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Buttons"),
        insertCfg: {
            "jcr:primaryType": "cq:WidgetCollection"
        },
        propList: {}
    },
    
    dialogfieldset: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Dialog Field Set"),
        insertCfg: {
            "jcr:primaryType": "cq:Widget",
            xtype: "dialogfieldset",
            items: {
                "jcr:primaryType": "cq:WidgetCollection"
            },
        },
        propList: {
            collapsed: "",
            collapsible: "",
            inputValue: "",
            name: "",
            title: "",          
        },
        allowedChilds: ["textfield", "textarea", "numberfield", "combo", "hidden", "richtext", "password", "componentselector",
                        "multifield", "tableedit2", "checkbox", "radio", "label", "fileuploadfield",
                        "selection", "sizefield", "datetime", "static", "tags", "paragraphreference", 
                        "pathfield", "colorfield", "colorlist", "cqinclude"]
    },
    
    structuredmultifield: {
        category: CQ.DialogEditor.CONTAINER,
        text: CQ.I18n.getMessage("Structured Multifield"),
        insertCfg: {
            xtype: "structuredmultifield",
            fieldConfig: {
                "jcr:primaryType": "cq:Widget",
                xtype: "dialogfieldset",
                orderable: true,
                items: {
                    "jcr:primaryType": "cq:WidgetCollection"
                }
            },
        },
        propList: {
            fieldLabel: "Multifield",
            fieldSubLabel: "",
            fieldDescription: "",
            orderable: "true",
            name: "",
        },
        allowedChilds: ["dialogfieldset", "cqinclude"]
    },
    
    /***********************************************************************************
     * Field
     **********************************************************************************/
    textfield: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Text Field"),
        insertCfg: {
            xtype: "textfield"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    multisetmodified: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Multi-Node Multiset"),
        insertCfg: {
            xtype: "multisetmodified"
        },
        allowedChilds: ["dialogfieldset"]

    },
    
    unmulticompositefielditem: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Test Inner"),
        insertCfg: {
            xtype: "unmulticompositefielditem"
        }
    },
    
    textarea: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Text Area"),
        insertCfg: {
            xtype: "textarea"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    richtext: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Rich Text"),
        insertCfg: {
            xtype: "richtext"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    numberfield: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Number Field"),
        insertCfg: {
            xtype: "numberfield"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    tableedit2: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Table"),
        insertCfg: {
            xtype: "tableedit2"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    combo: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Combo Box"),
        insertCfg: {
            xtype: "combo"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    hidden: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Hidden"),
        insertCfg: {
            xtype: "hidden"
        },
        propList: {
            fieldLabel: "",
            fieldSubLabel: "",
            fieldDescription: "",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    password: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Password"),
        insertCfg: {
            xtype: "password"
        },
        propList: {
            fieldLabel: "Password",
            fieldSubLabel: "Password Label",
            fieldDescription: "Password Description",
            name: "",
            allowBlank: false,
            blankText: "",
            disabled: false,
            emptyText: "",
            grow: false,
            hideLabel: false,
            hideMode: "",
            inputType: "",
            maxLength: "",
            maxLengthText: "",
            minLength: "",
            minLengthText: "",
            msgTarget: "",
            readOnly: false,
            selectOnFocus: false,
            regex: "",
            regexText: "",
            validateOnBlur: true,
            validationDelay: "",
            validationEvent: "",
            validator: "",
            vtype: "",
            vtypeText: ""
        }
    },
    
    sizefield: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Size Field"),
        insertCfg: {
            xtype: "sizefield"
        },
        propList: {
            fieldLabel: "Size Field",
            fieldSubLabel: "Size Field Label",
            fieldDescription: "Size Field Description",
            heightParameter:"./height",
            heightSuffix:"height",
            widthParameter:"./width",
            widthSuffix:"width",
        }
    },
    
    datetime: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Date Time"),
        insertCfg: {
            xtype: "datetime"
        },
        propList: {
            fieldLabel: "Date Time",
            fieldSubLabel: "Date Time Label",
            fieldDescription: "Date Time Description",
            name: "",
            ctCls: "cq-propsdialog-ontime",
        }
    },
    
    colorfield: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Color Field"),
        insertCfg: {
            xtype: "colorfield"
        },
        propList: {
            fieldLabel: "Color Field",
            fieldSubLabel: "Color Field Label",
            fieldDescription: "Color Field Description",
            name: "",
            defaultValue: "FFFFFF",
            showHexValue: true,
            value: "FFFFFF",
        }
    },
    
    pathfield: {
        category: CQ.DialogEditor.FIELD,
        text: CQ.I18n.getMessage("Path Field"),
        insertCfg: {
            xtype: "pathfield"
        },
        propList: {
            fieldLabel: "Path Field",
            fieldSubLabel: "Path Field Label",
            fieldDescription: "Path Field Description",
            name: "",
            suffix: "",
            rootPath: "",
            predicate: "",
        }
    },
    
    /***********************************************************************************
     * Button
     **********************************************************************************/
    button: {
        category: CQ.DialogEditor.BUTTON,
        text: CQ.I18n.getMessage("Button"),
        insertCfg: {
            "xtype": "button"
        },
        propList: {
            text: "",
            handler: ""
        }
    },

    /***********************************************************************************
     * Toggle
     **********************************************************************************/
    checkbox: {
        category: CQ.DialogEditor.TOGGLE,
        text: CQ.I18n.getMessage("Check Box"),
        insertCfg: {
            xtype: "checkbox",
        },
        propList: {
            boxLabel: "Box Label",
            checked: false,
            fieldLabel: "Check Box",
            fieldSubLabel: "Field Subtext",
            fieldDescription: "Field Description",
            inputValue: "true",
            name: "",
        }
    },
    
    radio: {
        category: CQ.DialogEditor.TOGGLE,
        text: CQ.I18n.getMessage("Radio"),
        insertCfg: {
            xtype: "radio"
        },
        propList: {
            boxLabel: "Box Label",
            checked: false,
            fieldLabel: "Radio",
            fieldSubLabel: "Field Subtext",
            fieldDescription: "Field Description",
            inputValue: "true",
            name: "",
        }
    },
    
    /***********************************************************************************
     * List
     **********************************************************************************/
    selection: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Select"),
        insertCfg: {
            xtype: "selection",
            type: "select",
        },
        propList: {
            allowBlank: true,
            fieldLabel: "Select",
            fieldSubLabel: "Field Subtext",
            fieldDescription: "Field Description",
            name: "",
            sortDir: "ASC",
        }
    },
    
    colorlist: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Color List"),
        insertCfg: {
            xtype: "colorlist"
        },
        propList: {
            fieldLabel: "Color List",
            fieldSubLabel: "Color List",
            fieldDescription: "Color List",
            name: "",
            border: false,
        }
    },
    
    tags: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Tags"),
        insertCfg: {
            xtype: "tags"
        },
        propList: {
            fieldLabel: "Tag Field",
            fieldSubLabel: "Tag Label",
            fieldDescription: "Tag Description",
            name: "",
        }
    },
    
    paragraphreference: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Paragraph Reference"),
        insertCfg: {
            xtype: "paragraphreference"
        },
        propList: {
            fieldLabel: "Paragraph Reference",
            fieldSubLabel: "Paragraph Reference Label",
            fieldDescription: "Paragraph Reference Description",
            name: "",
        }
    },
    
    multifield: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Multifield"),
        insertCfg: {
            xtype: "multifield"
        },
        propList: {
            fieldLabel: "Multifield Reference",
            fieldSubLabel: "Multifield Reference Label",
            fieldDescription: "Multifield Reference Description",
            name: "",
        }
    },
    
    fileuploadfield: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("File Upload Field"),
        insertCfg: {
            xtype: "fileuploadfield"
        },
        propList: {
            fieldLabel: "File Upload Field",
            fieldSubLabel: "File Upload Field Label",
            fieldDescription: "File Upload Field Description",
            ignoreData: true,
            regex: "/^.*.js$/",
            regexText: "Only javascript is allowed",
            name: "",
        }
    },
    
    componentselector: {
        category: CQ.DialogEditor.LIST,
        text: CQ.I18n.getMessage("Component Selector"),
        insertCfg: {
            xtype: "componentselector"
        },
        propList: {
            fieldLabel: "Component Selector",
            fieldSubLabel: "Component Selector Label",
            fieldDescription: "Component Selector Description",
            name: "",
        }
    },
    
    /***********************************************************************************
     * Static
     **********************************************************************************/
    "static": {
        category: CQ.DialogEditor.STATIC,
        text: CQ.I18n.getMessage("Static"),
        insertCfg: {
            "jcr:primaryType": "cq:Widget",
            xtype: "static",
        },
        propList: {
            bottommargin: true,
            text:"Static text"
        }
    },
    
    label: {
        category: CQ.DialogEditor.STATIC,
        text: CQ.I18n.getMessage("Label"),
        insertCfg: {
            "jcr:primaryType": "cq:Widget",
            xtype: "label",
        },
        propList: {
            text:"Label"
        }
    },
    
    /***********************************************************************************
     * Dynamic
     **********************************************************************************/
    cqinclude: {
        category: CQ.DialogEditor.DYNAMIC,
        text: CQ.I18n.getMessage("CQ include"),
        insertCfg: {
            "jcr:primaryType": "cq:Widget",
            xtype: "cqinclude",
        },
        propList: {
            path: "/libs/foundation/components/page/tab_advanced.infinity.json",
        }
    },
}