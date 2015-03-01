SWX.MixinPanel = CQ.Ext.extend(CQ.Ext.Panel, {
    initComponent: function() {
        SWX.MixinPanel.superclass.initComponent.call(this);
        var currentObj = this;
        this.on("render", function() {
            this.parentDialog = this.findParentByType("dialog");
            if (this.parentDialog) {
                var currentDialog = this.parentDialog;
                this.parentDialog.on("loadcontent", function(e) {
                    var currentPage = CQ.WCM.getPage(this.path);
                    CQ.HTTP.get(currentPage.path + ".mixins.json", function(options, success, response) {
                        if (success) {
                            var responseObj = JSON.parse(response.responseText);
                            var mixinsArray = responseObj.mixins;
                            if (mixinsArray.indexOf(currentObj.mixin) === -1) {
                                currentObj.disable();
                            }
                        } else {
                        	console.log("Error getting mixins. Disabling panel.");
                            currentObj.disable();
                        } 
                    });
                }, this.parentDialog);
            }
        }, this);

        this.on("loadcontent", this.setActivityState, this);
    }
});

CQ.Ext.reg("mixinpanel", SWX.MixinPanel);