SWX.SinglePar = {};

SWX.SinglePar.clearPar = function(itemInput) {
    if (!CQ.WCM.getSelection().contains(itemInput)) {
        CQ.WCM.deselect();
    }
    var items = [];
    var checkUrl = "/bin/wcm/references.json";
    var sel = CQ.WCM.getSelectedItems();

    if (sel.length == 0 && itemInput) {
        sel.push(itemInput);
    }
    for (var s = 0; s < sel.length; s++) {
        console.log("inside");
        items.push(sel[s]);
        checkUrl = CQ.HTTP.addParameter(checkUrl, "path", sel[s].path);
    }

    if (items.length > 0) {
        // send request to /bin/wcm/references to check if there are any
        // references to the selected items.
        checkUrl = CQ.HTTP.noCaching(checkUrl);
        var data = CQ.HTTP.eval(checkUrl);
        var numRefs = 0;
        if (data && data.pages) {
            for (var i=0;i<data.pages.length;i++) {
                try {
                    numRefs += data.pages[i].references.length;
                } catch(e) {
                    // ignore
                }
            }
        }

        var lockedLiveRelationship = false;
        var enableLiveRelationship = false;
        for (i = 0; i < items.length; i++) {
            if(items[i].enableLiveRelationship && items[i].liveStatusLocked) {
                lockedLiveRelationship = true;
                enableLiveRelationship = true;
                break;
            }
        }

        var msg = CQ.I18n.getMessage("Do you really want to delete the selected component(s)?");
        if (lockedLiveRelationship) {
            msg = CQ.I18n.getMessage("Do you really want to cancel inheritance and delete the selected component(s)?");
        }
        if (numRefs > 0) {
            msg = CQ.I18n.getMessage("One or more of the selected components are referenced. Do you really want to delete them?");
            if (lockedLiveRelationship) {
                msg = CQ.I18n.getMessage("One or more of the selected components are referenced. Do you really want to cancel inheritance and delete them?");
            }
        }
        CQ.Ext.Msg.confirm(
                CQ.I18n.getMessage("Delete Component(s)"),
                msg,
                function(btnId) {
                    if (btnId == "yes") {
                        var isUndoEnabled = CQ.undo.UndoManager.isEnabled();
                        var undoHistory = (isUndoEnabled ?  CQ.undo.UndoManager.getHistory()
                                : null);
                        var undoStep = (isUndoEnabled ? undoHistory.createUndoStep(
                                undoHistory.createStepConfig()) : null);
                        // we'll have to collect undo data before the removal actually
                        // happens to preserve correct insert points
                        var undoData = null;
                        if (isUndoEnabled) {
                            undoData = [ ];
                            for (var d = 0; d < items.length; d++) {
                                var parData = CQ.undo.util.UndoUtils.getCurrentData(
                                        items[d]);
                                undoData.push(parData);
                                var blobs = parData.blobs;
                                var blobCnt = blobs.length;
                                for (var b = 0; b < blobCnt; b++) {
                                    blobs[b].save(undoHistory.binaryServletUrl,
                                            items[d].path);
                                }
                            }
                        }
                        // removal & setting undo data
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            CQ.wcm.EditBase.doRemoveParagraph(item);
                            if (isUndoEnabled) {
                                undoStep.addUndoAction(
                                        new CQ.undo.actions.RemoveParagraphAction(
                                                undoHistory.getIdManager(), item.path,
                                                undoData[i].insertBefore, undoData[i].data,
                                                undoData[i].blobs, undoData[i].compInfo,
                                                item.dropTarget, item.hasAnnotations()));
                            }
                        }
                        if (isUndoEnabled) {
                            CQ.undo.util.UndoUtils.sortRemoveParagraphActions(undoStep);
                            undoStep.commit();
                        }

                        // todo: handle better. ghosts are not reloaded because
                        // components change edit layout (eg. buttons, editbar/rollovers)
                        if( enableLiveRelationship) {
                            this.refreshPage();
                        }
                        itemInput.refreshParent();
                    }
                },
                this
                );
    }

}