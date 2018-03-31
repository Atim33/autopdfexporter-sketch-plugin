# Auto PDF Exporter nSlicer Sketch Plugin

A Sketch Plugin to auto-export all '[S]' Prefix artboards to a single pdf, no slices needed! Plugin auto creates slices from prefixed Artboards and exports them into a single page-sorted pdf file.

<img src="https://github.com/Atim33/autopdfexporter-sketch-plugin/blob/master/overview.png"></img>


# Instructions

<ol type="1">
  <li>Firstly to set which Artboards you want to export to a single pdf, the only thing you need to do is prefix the artboard's name with the characters "[S]" e.g. "[S] Artboard 1", that's it!</li>

  <li>To set the order for which you want your Artboards to appear in the pdf, append any numbers or letters after the prefix e.g. "[S] 1.0 Intro", "[S] 2.1 Welcome" .etc there's a sorting mechanism that will order them alphabetically 0-9 then A-Z, based on the artboard name and not the position within the sketch file.</li>

  <li>That's it! The plugin will find all artboards with the prefix '[S]', add a temporary slice behind it, then export those slices to a single PDF and finally remove the annoying slices.</li>
</ol>

# Notes
<ul>
  <li>Removing the slices is useful as it allows you to change your artboard sizes at any point, the new slices will simply update to the new artboard sizes.</li>
  <li>The '[S]' prefix is useful as we usually don't necessarily want to export all artboards but a select few. The [S] can be attached to both the Big Artboards and any small artboards on top of them, wherever there's an '[S]' prefix it will be added to the pdf file.</li>
</ul>

# Installation
<ul>
  <li>Download <a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/archive/master.zip">master.zip</a>, unzip it, then double-click the "automate-sketch.sketchplugin".</li>
  <li><a href="https://github.com/Atim33/autopdfexporter-sketch-plugin/releases">Download</a> for older version Sketch.</li>
  <li>Regards, KhY.</li>
</ul>
