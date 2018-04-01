# Auto PDF Exporter nSlicer Sketch Plugin
A Sketch Plugin to auto-export all '[S]' Prefix artboards to a single pdf, no slices needed!

## What?
Have you ever needed to export specific artboards to a single combined pdf. This Plugin does just that and auto creates slices from prefixed Artboards then exports them into a single page-sorted pdf file. The Plugin auto-exports all '[S]' Prefix artboards to a single pdf file. 

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview.png"></img>

## Artboards on top of artboards
Plugin also works with Artboards on top of Arboards by auto creating slices (Works with Sketch 49). The slices will be created temporarily and removed allowing you to change your artboard sizes at any point, with the new slices updating to the new artboard sizes.

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview2.png"></img>


## Instructions

<ol type="1">
  <li>Firstly to set which Artboards you want to export to a single pdf, the only thing you need to do is prefix the artboard's name with the characters "[S]" e.g. "[S] Artboard 1", that's it!</li>

  <li>To set the order for which you want your Artboards to appear in the pdf, append any numbers or letters after the prefix e.g. "[S] 1.0 Intro", "[S] 2.1 Welcome" .etc there's a sorting mechanism that will order them alphabetically 0-9 then A-Z, based on the artboard name and not the position within the sketch file.</li>

  <li>That's it! The plugin will find all artboards with the prefix '[S]', add a temporary slice behind it, then export those slices to a single PDF and finally remove the annoying slices.</li>
</ol>

## Additional Notes
<ul>
  <li>Removing the slices is useful as it allows you to change your artboard sizes at any point, the new slices will simply update to the new artboard sizes.</li>
  <li>The '[S]' prefix is useful as we usually don't necessarily want to export all artboards but a select few. The [S] can be attached to both the Big Artboards and any small artboards on top of them, wherever there's an '[S]' prefix it will be added to the pdf file.</li>
</ul>

## Installation
<ul>
  <li>Download <a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/archive/master.zip">master.zip</a>, unzip it, then double-click the "Auto-PDF-Exporter-nSlicer.sketchplugin".</li>
  <li><a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/releases">Download</a> for older version Sketch.</li>
</ul>

## Versions
<ul>
  <li>https://github.com/Atim33/autopdfexporter-sketch-plugin</li>
  <li>v3.45 - Works with Sketch 49.2 and below</li>
  <li>v3.40 - Works with Sketch 48 and below</li>
</ul>


## Thanks
Hope you find this plugin useful. If you have ideas to improve it, please don't hesitate to create a new issue or pull request. Regards, KhY.
