SWX.ImageRenditions = SWX.ImageRenditions || {};

SWX.ImageRenditions.updateRenditions = function(smartImage) {
    var dialog = smartImage.getToplevel();
    var selections = dialog.findByType('selection');
    for(var i = 0; i < selections.length; i++) {
        if(selections[i].previousSibling() === smartImage) {
            var selection = selections[i];
            if(selection.getValue().indexOf(smartImage.originalRefImage.dataPath) === -1) {
                $CQ.getJSON(smartImage.originalRefImage.dataPath + '.renditions.json', function(data) {
                    selection.setOptions(data);
                    selection.setValue(null);
                });
            }
        }
    }
};

SWX.ImageRenditions.loadRenditions = function(selection, record, path) {
    var smartImage = selection.previousSibling();
    if(record.get(smartImage.fileReferenceParameter) != null) {
        $CQ.getJSON(record.get(smartImage.fileReferenceParameter) + '.renditions.json', function(data) {
            selection.setOptions(data);
            selection.setValue(record.get(selection.name));
        });
    }
};