/**
 *  SWX NodeViewer
 *  An extension of the ExtJS TreePanel component.
**/

/**
 * @class NodeViewer
 * @extends CQ.Ext.tree.TreePanel
 * @constructor
 * Creates a new NodeViewer.
 * @param {Object} config The config object
 */
SWX.NodeViewer = CQ.Ext.extend(CQ.Ext.tree.TreePanel, {
	
	constructor: function(config) {
		if (!config.fieldConfig) {
            config.fieldConfig = {};
        }
        if (!config.fieldConfig.xtype) {
            config.fieldConfig.xtype = "textfield";
        }
        
        config.test = new CQ.form.DialogFieldSet({
        	
        	
        });
        config.fieldConfig.name = config.name;
        config.fieldConfig.ownerCt = this;
        
        config = CQ.Util.applyDefaults(config, {
            "defaults":{
                "xtype":"nodeviewer",
                "fieldConfig":config.fieldConfig,
                "test": config.test
            },
        });
        
        SWX.NodeViewer.superclass.constructor.call(this,config);
	},
	
	layout : 'form',
    useArrows: true,
    autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    
    loader: new CQ.tree.SlingTreeLoader({
    	url: '/content/g2pc-blueprint/en_US/jcr:content/globalHeader/utilitynavigation/countrySelector.infinity.json',
		path: '/content/g2pc-blueprint/en_US/jcr:content/globalHeader/utilitynavigation/countrySelector',
		clearOnLoad: true,
		typeIncludes: ['nt:unstructured'],
		requestMethod: 'GET',
		preloadChildren: true,
		baseAttrs: {
			'singleClickExpand' : true,
			'iconCls' : "folder",
			'jcr:primaryType' : 'nt:unstructured',
			'jcr:title' : 'title',
			'linkURL' : 'test linkURL'
		},
		listeners: {
			load: function(loader, node, response) {
				if(response.responseText) {
					var responseJSON = JSON.parse(response.responseText);
					node.data = responseJSON;
					
					var path = node.ownerTree.selectedPath ? node.ownerTree.selectedPath : loader.path;
					var hiddenField = new CQ.Ext.form.TextField({
						name: path,
						value: 'omg'
					});
					//console.log(node.ownerTree.fieldConfig);
					//var component = node.ownerTree.fieldConfig.find("name", "title");
					//console.log(node.fieldConfig);
					console.log(fieldConfig);
				}
			}
		}
    }),
    
    root: {
        nodeType: 'async',
        text: 'Root',
        expanded: true,
        editable: true,
        id: 'source',
        name: 'content/g2pc-blueprint/en_US/jcr:content/globalHeader/utilitynavigation/countrySelector',
    },
    
    contextMenu: new CQ.Ext.menu.Menu({
        items: [{id: 'add-node', text: 'Add Node'},
                {id: 'delete-node', text: 'Delete Node'}],
        listeners: {
            itemclick: function(item) {
                switch (item.id) {
                	case 'add-node':
                		var n = item.parentMenu.contextNode;
						if(n.parentNode) {
							var newNode = new CQ.Ext.tree.TreeNode({
								name: "new",
								text: "new",
								expanded: true,
						        editable: true,
						        draggable: true,
							});
							
							newNode.parentNode = n;
							newNode.parentTree = n.parentTree;
							n.appendChild(newNode);
							n.renderChildren(true);
						}
                		break;
                    case 'delete-node':
                        var n = item.parentMenu.contextNode;
                        if (n.parentNode) {
                            n.remove();
                        }
                        break;
                }
            }
        }
    }),
    
    listeners: {
    	click: function(n) {
			console.log(n);
         },
        contextmenu: function(node, e) {
            node.select();
            var c = node.getOwnerTree().contextMenu;
            c.contextNode = node;
            c.showAt(e.getXY());
        }
    },
    
    hiddenField: null,
    fieldConfig: null,
    
    initComponent: function () {
    	SWX.NodeViewer.superclass.initComponent.call(this);
    	console.log(this);
    	this.add(this.fieldConfig);
    }
});

CQ.Ext.reg("nodeviewer", SWX.NodeViewer);