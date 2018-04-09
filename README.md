# Auto PDF Exporter nSlicer Sketch Plugin
A Sketch Plugin to auto-export all '[S]' Prefix artboards to a single pdf. Helps with the issue of "my Artboard won’t export other Artboards on top of it", no manual slices needed!

## Presentation's in a click
Very often presentation material is useful to illustrate a flow or product, this plugin helps eliminate the need to create a seperate Powerpoint/Keynote presentation. All presentation slides can be created directly in Sketch and exported to a single PDF with one click, eliminating the double work of maintaining a ppt file with embedded png's and a sketch file of the original designs (especially when changes take place) making design updates to your presentation/documentation easier and more seamless.

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview3.png"></img>


## Artboards on top of artboards
Have artboards on top of other artboards? so do we. This plugin works with Artboards layered on top of other Arboards and will auto create slices for you (Works with Sketch 49 and below). The slices will be created temporarily to allow the export of the big artboards and will then be removed allowing you to change your artboard sizes at any point, with the new slices updating to the new artboard sizes.

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview2.png"></img>


## Export specific artboards
Have you ever needed to export specific artboards to a single combined pdf. This Plugin does just that and auto creates slices from prefixed Artboards then exports them into a single page-sorted pdf file. 

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview.png"></img>


## Instructions

<ol type="1">
  <li>Step-1. To set which Artboards you want to export to a single pdf, the only thing you need to do is add the prefix "[S]" to the artboard's name e.g. "[S] Artboard 1", that's it!</li>

  <li>Step-2. To set the order for which you want your Artboards to appear in the pdf, append any numbers or letters after the prefix e.g. "[S] 1.0 Intro", "[S] 2.1 Welcome" .etc there's a sorting mechanism that will order them alphabetically 0-9 then A-Z, based on the artboard name and not the position of the artboard within the sketch file.</li>

  <li>Step-3. That's it! Run the plugin! The plugin will find all artboards with the prefix '[S]', add a temporary slice behind it, then export those slices to a single PDF and remove the temporary slices.</li>
</ol>

## Additional Notes
<ul>
  <li>The '[S]' prefix is useful as we usually don't necessarily want to export all artboards but a select few. The [S] can be attached to both the Big Artboards and any small artboards on top of them, wherever there's an '[S]' prefix the artboard will be added and exported to the pdf file.</li>
  <li>The plugin removes the temporary slices when its done, this is useful as it allows you to change your artboard sizes at any point and when you run the plugin again any the new slices will simply update to the new artboard sizes.</li>
  <li>Simplifiers the issue of Sketch 49 "<a href="https://www.sketchapp.com/support/troubleshooting/nested-artboard-export">my Artboard won’t export other Artboards on top of it</a>", no manual slices needed!</li>
  <li>Note. Artboards are converted to png's first to preserve gradients and colour accuracy in the final PDF files.</li>
</ul>

## Installation
<ul>
  <li>Download <a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/archive/master.zip">master.zip</a>, unzip it, then double-click the "Auto-PDF-Exporter-nSlicer.sketchplugin".</li>
  <li>Latest plugin url: https://github.com/Atim33/autopdfexporter-sketch-plugin</li>
  <li>Other sketch plugins: https://github.com/sketchplugins/plugin-directory</li>
  <li><a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/releases">Download</a> for older version Sketch.</li>
</ul>

## Versions
<ul>
  <li>v3.46 - Works with Sketch 49.2 and below</li>
  <li>v3.40 - Works with Sketch 48 and below</li>
</ul>


## Thanks
Hope you find this plugin useful. If you have ideas to improve it, please don't hesitate to create a new issue or pull request. Regards, KhY.
