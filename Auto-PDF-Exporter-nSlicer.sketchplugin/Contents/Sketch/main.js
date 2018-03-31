//-------------------------------------------------------------------------------
// Vars
//-------------------------------------------------------------------------------
var horizontalTextField;
var defaults = {exportToImages: true, exportImagesScale: "1.0"} // true false


//-------------------------------------------------------------------------------
// onRun
//-------------------------------------------------------------------------------
function onRun(context) {
	//------------------------------
	// Vars
	//------------------------------
	var doc = context.document;
	var page = doc.currentPage();
	
	
	//------------------------------
	// for backwards compatibility (see: http://sketchplugins.com/d/280-deselectalllayers-not-working-in-v45)
	//------------------------------
	if(page.deselectAllLayers){
    	  page.deselectAllLayers();
  	} else {
    	page.changeSelectionBySelectingLayers_([]);
  	}


	//------------------------------
	// Filter artboards_for_export
	//------------------------------
	var artboards_for_export = []
	var artboards_for_export_debug = "";
    var artboards = doc.currentPage().artboards();
    var loop = artboards.objectEnumerator();
    while (artboard = loop.nextObject()) {
      if (artboard.exportOptions().exportFormats()) {
		if (artboard.name().startsWith("[S]") && isArtboard(artboard)) {
			artboards_for_export_debug += artboard.name() + ", " ;  //FOR DEBUG
			artboards_for_export.push(artboard)
		}
      }
    }//------------------------------
	// Debug test..
	//------------------------------
	//alertMsg("Debug Message", "Artboards_for_export: #" + artboards_for_export.length + "\r\nArtboards: " + artboards_for_export_debug + ".", "Got it")
 
 
	//------------------------------
	// Sort Artboards for export [S]01, [S]02, [S]03 .etc
	//------------------------------
	artboards_for_export.sort(naturalSort)
 
 
	//------------------------------
	// Loop through Artboards_for_export
	// & Create temp slices
	//------------------------------
    var slices = [] // Keep track of all the temporary slices we create, so we can delete them later
	var slices_for_export_debug = "";
	for (i = 0; i < artboards_for_export.length; i++) { 
		//------------------------------
		// Create temp slices
		//------------------------------
		var curArtboard = artboards_for_export[i];
		slices_for_export_debug += curArtboard.name() + ", " ;  //FOR DEBUG
      	var slice = MSSliceLayer.sliceLayerFromLayer(curArtboard)
		var rect = curArtboard.absoluteRect()
      	slice.absoluteRect().setX(rect.origin().x)
      	slice.absoluteRect().setY(rect.origin().y)
      	slice.absoluteRect().setWidth(rect.size().width)
      	slice.absoluteRect().setHeight(rect.size().height)
    	slices.push(slice)
	}//------------------------------
	// Debug test..
	//------------------------------
	//alertMsg("Debug Message", "Temp_slices: #" + slices.length + "\r\n\r\nSlices: " + slices_for_export_debug + ".\r\n\r\n\r\nWorkeds!!", "Got it")



	//------------------------------
	// Export Slices ;)
	//------------------------------
	slices_for_export_debug = "";
    var slices_for_export = [] // Keep track of all the temporary slices we create, so we can delete them later
	var myslices = doc.currentPage().exportableLayers();
	var loop = myslices.objectEnumerator();
	while (slice = loop.nextObject()) {
		if (slice instanceof MSSliceLayer && slice.name().startsWith("[S]")) {
			//slice.select_byExpandingSelection(true, true);
			slices_for_export_debug += slice.name() + ", " ;  //FOR DEBUG
			slices_for_export.push(slice)
		}	
  	}//------------------------------
	// Debug test..
	//------------------------------
	//alertMsg("Debug Message", "Slices_for_export: #" + slices_for_export.length + "\r\n\r\nSlices: " + slices_for_export_debug + ".\r\n\r\n\r\nWorkedx!!", "Got it")


	//------------------------------
	// PNG export
	//------------------------------
  	//context.document.exportSliceLayers(slices)
	
	

	//------------------------------
	// Instructions
	//------------------------------	
	var instructions = "A Sketch Plugin to auto-export all '[S]' Prefix artboards to a single pdf, no slices needed! by auto creating slices from prefixed Artboards and exporting them :)\r\n\r\n-- instructions--\r\n[1] Firstly to set which Artboards you want to export to a single pdf, the only thing you need to do is prefix the artboard's name with the characters \"[S]\" e.g. \"[S] Artboard 1\", that's it!\r\n\r\n[2] To set the order for which you want your Artboards to appear in the pdf, append any numbers or letters after the prefix e.g. \"[S] 1.0 Intro\", \"[S] 2.1 Welcome\" .etc there's a sorting mechanism that will order them alphabetically 0~9 then A~Z, based on the artboard name and not the position within the sketch file.\r\n\r\n[3] That's it! The plugin will find all artboards with the prefix '[S]', add a temporary slice behind it, then export those slices to a single PDF and finally remove the annoying slices.\r\n\r\n[4] Note. removing the slices is useful as it allows you to change your artboard sizes at any point, the new slices will simply update to the new artboard sizes.\r\n\r\n-- notes--\r\nThe '[S]' prefix is useful as we usually don't necessarily want to export all artboards but a select few. The [S] can be attached to both the Big Artboards and any small artboards on top of them, wherever there's an '[S]' prefix it will be added to the pdf file.."
	var alertResponse = alertMsgInput("✂️ Auto-export PDF instructions!", instructions, " Auto-export PDF ! ")  

	
	//------------------------------
	// IF alertResponse = "Export"
	//------------------------------
	if (alertResponse == '1000') {
		//------------------------------
		// PDF export
		//------------------------------
		//var defaults = {exportToImages: true, exportImagesScale: 2.0} // true false
		var filesToDelete = []
		var pdf = PDFDocument.alloc().init()
		var exportName = doc.hudClientName().replace(".sketch","");
		var saveLocation = promptSaveLocation(exportName)


		for (i = 0; i < slices_for_export.length; i++) { 	
			//------------------------------
			// Export format – PNG image
			//------------------------------
			if (defaults.exportToImages) {
	      	  var artboard = slices_for_export[i];	

	      	  // Create a temporary image of the artboard
	      	  var random = NSUUID.UUID().UUIDString()
	      	  var imagePath = NSTemporaryDirectory() + artboard.objectID() + ' ' + random + '.png'

	      	  // Create a new temporary export option
	      	  artboard.exportOptions().addExportFormat()
	      	  var newExportFormat = artboard.exportOptions().exportFormats().lastObject()
	      	  newExportFormat.name = ''
	      	  newExportFormat.format = 'png'
		  
	      	  //newExportFormat.scale
	      	  newExportFormat.scale = horizontalTextField.stringValue(); //defaults.exportImagesScale  
			  ////alertMsg("Debug Message", "bla_11", "Got it")
		  
	      	  var rect = artboard.absoluteRect().rect()
	      	  var slice = MSExportRequest.exportRequestFromExportFormat_layer_inRect_useIDForName(newExportFormat, artboard, rect, false)
	      	  doc.saveArtboardOrSlice_toFile(slice, imagePath)
	      	  filesToDelete.push(imagePath)
	      	  artboard.exportOptions().removeExportFormat(newExportFormat)

	      	  // Add the image as a page to our PDF
	      	  var image = NSImage.alloc().initByReferencingFile(imagePath)	
	      	  var artboardPDF = PDFPage.alloc().initWithImage(image)
	      	  pdf.insertPage_atIndex(artboardPDF, pdf.pageCount())		
			
			
			//------------------------------
			// Export format – PDF
			//------------------------------
			} else {
				var curArtboard = slices_for_export[i];	
				var artboard_pdf = MSPDFBookExporter.pdfFromArtboard(curArtboard);
				pdf.insertPage_atIndex(artboard_pdf, pdf.pageCount())
		
			}
		}pdf.writeToURL(saveLocation)


	//------------------------------
	// IF alertResponse = "Cancel"
	//------------------------------
	}else{
		//alertMsg("0", "0", "0")  
	}
	

	//------------------------------
	// Remove temporary slices from the document
	//------------------------------
    slices.forEach(function(slice) {
      slice.removeFromParent()
    })//------------------------------
	// Debug test..
	//------------------------------
	//alertMsg("Alert Message", "Removed temporary slices from the document!", "Got it")  
};


//-------------------------------------------------------------------------------
// Show an alert with input
//-------------------------------------------------------------------------------
function alertMsgInput(title, message, button) {
	var alert = NSAlert.alloc().init()
	//alert.setIcon(iconImage)
	alert.setMessageText(title)
	alert.setInformativeText(message)
	alert.addButtonWithTitle(button)
	alert.addButtonWithTitle("Cancel")

	var y = 80
	var container = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, y))
	alert.setAccessoryView(container)

	// Create and configure your inputs here
	// ...
	
	// Creating the view
	var viewWidth = 200; var viewHeight = 40; y = 40
    var horizontalLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight, 300, y));
	horizontalLabel.setStringValue("-- Export quality scale (1.0, 1.5, 2.0, 3.0 .etc) --");
	horizontalLabel.setSelectable(false);
	horizontalLabel.setEditable(false);
	horizontalLabel.setBezeled(false);
	horizontalLabel.setDrawsBackground(false);
	container.addSubview(horizontalLabel);
	
	// Creating the inputs
	y = 20
	horizontalTextField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight, 100, y));
	container.addSubview(horizontalTextField);
	horizontalTextField.setStringValue(defaults.exportImagesScale);
	//defaults.exportImagesScale = 3;
	
	// Show the dialog
	return alert.runModal()
}



//-------------------------------------------------------------------------------
// Returns true if the given layer is an artboard-like object (i.e. an artboard
// or a symbol master).
//-------------------------------------------------------------------------------
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}



//-------------------------------------------------------------------------------
// Present a dialog to prompt the user to select the location to save the file
// 'filename' is the placeholder file name for the prompt
//-------------------------------------------------------------------------------
function promptSaveLocation(fileName) {
  var saveDialog = NSSavePanel.savePanel()
  saveDialog.setNameFieldStringValue(fileName)
  saveDialog.setAllowedFileTypes(["pdf"])
  // If the users selects 'OK', return the location they specified
  if (saveDialog.runModal() == NSOKButton)
    return saveDialog.URL()
  // Otherwise return nothing
  return nil
}



//-------------------------------------------------------------------------------
// Show an alert
//-------------------------------------------------------------------------------
function alertMsg(title, message, button) {
  var alert = NSAlert.alloc().init()
  alert.setMessageText(title)
  alert.setInformativeText(message)
  alert.addButtonWithTitle(button)
  alert.addButtonWithTitle("Cancel")
  return alert.runModal()
}


//-------------------------------------------------------------------------------
// NaturalSort
//-------------------------------------------------------------------------------
function naturalSort(a, b) {
    var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        sre = /(^[ ]*|[ ]*$)/g,
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) { return naturalSort.insensitive && (''+s).toLowerCase() || ''+s },
        // convert all to strings strip whitespace
        x = i(a.name()).replace(sre, '') || '',
        y = i(b.name()).replace(sre, '') || '',
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
        yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD)
        if ( xD < yD ) return -1;
        else if ( xD > yD ) return 1;
    // natural sorting through split numeric strings and default strings
    for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with '0', string or 0 if not defined (Clint Priest)
        oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if (oFxNcL < oFyNcL) return -1;
        if (oFxNcL > oFyNcL) return 1;
    }
    return 0;
}
