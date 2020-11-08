/**
 * Sample plugin.
 */
Draw.loadPlugin(function (ui) {

    var graph = ui.editor.graph;

    const SIZE = 33;

    var imgOrange = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs><linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="mx-gradient-ffcd28-1-ffa500-1-s-0"><stop offset="0%" style="stop-color:#ffcd28"/><stop offset="100%" style="stop-color:#ffa500"/></linearGradient></defs><g><ellipse cx="10" cy="10" rx="10" ry="10" fill="url(#mx-gradient-ffcd28-1-ffa500-1-s-0)" stroke="#d79b00" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgRed = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs/><g><ellipse cx="10" cy="10" rx="10" ry="10" fill="#e51400" stroke="#b20000" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgGreen = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs/><g><ellipse cx="10" cy="10" rx="10" ry="10" fill="#60a917" stroke="#2d7600" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgGray = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs><linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="mx-gradient-f5f5f5-1-b3b3b3-1-s-0"><stop offset="0%" style="stop-color:#f5f5f5"/><stop offset="100%" style="stop-color:#b3b3b3"/></linearGradient></defs><g><ellipse cx="10" cy="9.98" rx="10" ry="10" fill="url(#mx-gradient-f5f5f5-1-b3b3b3-1-s-0)" stroke="#666666" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgExclamation = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="25px" height="22px" viewBox="-0.5 -0.5 25 22"><defs/><g><path d="M 10.31 0.66 C 10.63 0.1 11.23 -0.25 11.88 -0.25 C 12.53 -0.25 13.13 0.1 13.45 0.66 L 23.58 17.74 C 23.82 18.24 23.77 18.83 23.45 19.29 C 23.13 19.75 22.59 20 22.03 19.94 L 1.47 19.94 C 0.93 19.86 0.47 19.52 0.24 19.03 C 0 18.54 0.02 17.97 0.28 17.5 Z M 10.5 5.52 L 10.93 12.68 L 12.88 12.68 L 13.24 5.52 Z M 10.38 15.48 C 10.38 16.34 11.07 17.03 11.93 17.03 C 12.78 17.03 13.47 16.34 13.47 15.48 C 13.47 15.07 13.31 14.68 13.02 14.39 C 12.73 14.1 12.34 13.94 11.93 13.94 C 11.52 13.94 11.12 14.1 10.84 14.39 C 10.55 14.68 10.38 15.07 10.38 15.48 Z" fill="#e51400" stroke="#b20000" stroke-miterlimit="10" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgStarEmpty = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18px" height="17px" viewBox="-0.5 -0.5 18 17"><defs/><g><path d="M -0.01 5.75 L 6.44 5.75 L 8.41 -0.12 L 10.38 5.75 L 16.83 5.75 L 11.69 9.68 L 13.73 15.88 L 8.41 12.04 L 3.09 15.88 L 5.13 9.68 Z" fill="none" stroke="#d79b00" stroke-miterlimit="10" pointer-events="all"/></g></svg>'), SIZE, SIZE);
    var imgStarFull = new mxImage('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18px" height="17px" viewBox="-0.5 -0.5 18 17"><defs><linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="mx-gradient-ffd966-1-ffa500-1-s-0"><stop offset="0%" style="stop-color:#FFD966"/><stop offset="100%" style="stop-color:#ffa500"/></linearGradient></defs><g><path d="M -0.01 5.87 L 6.44 5.87 L 8.41 0 L 10.38 5.87 L 16.83 5.87 L 11.69 9.8 L 13.73 16 L 8.41 12.16 L 3.09 16 L 5.13 9.8 Z" fill="url(#mx-gradient-ffd966-1-ffa500-1-s-0)" stroke="#d79b00" stroke-miterlimit="10" pointer-events="all"/></g></svg>'), SIZE, SIZE);

    function updateOverlays(cell) {
        var varOldStatus = cell.getAttribute('status_old');
        var varStatus = cell.getAttribute('status');

        var varStars = cell.getAttribute('stars');
        var varMaxStars = cell.getAttribute('maxstars') || 3;

        if (varStatus != null && varStatus.length > 0) {
            if (varStatus != varOldStatus && varOldStatus != null || varOldStatus == null) {
                graph.removeCellOverlays(cell);
            }

            var overlays = graph.getCellOverlays(cell);
            if (overlays == null) {

                switch (varStatus) {
                    case 'orange':
                        imxImage = imgOrange;
                        break;
                    case 'red':
                        imxImage = imgRed;
                        break;
                    case 'green':
                        imxImage = imgGreen;
                        break;
                    case 'exc':
                        imxImage = imgExclamation;
                        break;
                    default:
                        imxImage = imgGray;
                        break;
                }

                var indicatorOverlay = new mxCellOverlay(
                    imxImage,
                    null, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, new mxPoint(-SIZE / 3, -SIZE / 2), 'default');

                cell.setAttribute('status_old', varStatus);
                graph.addCellOverlay(cell, indicatorOverlay);

                if (varStars != null && varStars.length > 0) {
                    if (varStars != null && varMaxStars != null && varMaxStars >= varStars) {
                        for (let index = 0; index < varMaxStars; index++) {

                            if (index < varStars) {
                                img = imgStarFull;
                            } else {
                                img = imgStarEmpty;
                            }

                            var starOverlay = new mxCellOverlay(
                                img,
                                null, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, new mxPoint(-SIZE / 3, SIZE / 2 + SIZE * index), 'default');

                            graph.addCellOverlay(cell, starOverlay);
                        }
                    }
                }
            }
        }
        else {
            graph.removeCellOverlays(cell);
        }
    };

    function refresh() {
        var cells = graph.model.cells;

        for (var id in cells) {
            updateOverlays(cells[id]);
        }
    };

    function parseCSVData(data) {
        var allTextLines = data.split(/\r\n|\n/);

        var cells = graph.model.cells;

        var cellmap = new Map();

        for (var id in cells) {
            var cell = cells[id];

            if (cell != null) {

                //aa
                var lbl = cell.getAttribute('x-id');
                if (lbl == null) {
                    lbl = cell.value
                    cell.setAttribute('x-id', lbl);
                }
                cellmap.set(lbl, id)
            }
        }

        for (let index = 0; index < allTextLines.length; index++) {
            const line = allTextLines[index];
            var entries = line.split(/;|\t/);

            var dataID = entries[0];
            var dataStatus = entries[1];
            var dataStars = entries[2];

            if (dataID != null && cellmap.has(dataID)) {
                var cell = cells[cellmap.get(dataID)];
                cell.setAttribute('status_old');

                if (dataStatus != null) {
                    cell.setAttribute('status', dataStatus)
                }
                if (dataStars != null) {
                    cell.setAttribute('stars', dataStars)
                    cell.setAttribute('maxstars', dataStars)
                }
            }
        }

        refresh();
    }

    // Adds action
    ui.actions.addAction('importData...', function () {
        // Only modern browsers for now. We'll move the import
        // code above to the main codebase later
        if (Graph.fileSupport) {
            if (ui.impFMFileInputElt == null) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');

                mxEvent.addListener(input, 'change', function () {
                    if (input.files != null) {
                        // Only one file for now...
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            parseCSVData(e.target.result);
                        };

                        reader.readAsText(input.files[0]);

                        // Resets input to force change event for same file (type reset required for IE)
                        input.type = '';
                        input.type = 'file';
                        input.value = '';
                    }
                });

                input.style.display = 'none';
                document.body.appendChild(input);
                ui.impFMFileInputElt = input;
            }

            ui.impFMFileInputElt.click();
        }
    });

    // Adds menu
    ui.menubar.addMenu('CSV Data', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'importData');
    });

    // Moves import menu to before help menu
    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
        ui.menubar.container.lastChild.previousSibling.previousSibling.previousSibling);

    graph.addListener(mxEvent.SIZE, refresh);
    refresh();
});