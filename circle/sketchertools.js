// sketchertools.js - drawing etc. tools for sketcher2.js

function Tool(name, project) {
	this.name = name;
	this.project = project;
	
	this.MAX_ZOOM = 2;
}

Tool.prototype.begin = function(point) {
	console.log('begin '+this.name+' at '+point);
};

Tool.prototype.move = function(point) {
	console.log('move '+this.name+' at '+point);
};

Tool.prototype.end = function(point) {
	console.log('end '+this.name+' at '+point);
};

function activateOverlay(project) {
	project.activate();
	project.layers[2].activate();
}

function LineTool(project, sketchbook, sketchId, curveFlag, straightFlag) {
	// call super cons
	Tool.call(this, 'line', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;
	this.curveFlag = curveFlag;
	this.straightFlag = straightFlag;
}

// inherit (apparently)
LineTool.prototype = new Tool();

LineTool.prototype.begin = function(point) {
	// activate overlay layer
	activateOverlay(this.project);
	this.frameStyle = getProperty('frameStyle', 'border');
	this.lineColor = getLineColor();
	this.fillColor = getFillColor();
	this.lineWidth = getProperty('lineWidth', 1);
	this.path = new paper.Path();	
	if (this.frameStyle.indexOf('border')>=0 || !this.frameStyle)
		this.path.strokeColor = this.lineColor;
	if(this.frameStyle.indexOf('fill')>=0) {
		this.path.closed = true;
		this.path.fillColor = this.fillColor;
	}
	this.path.strokeWidth = this.lineWidth;
	this.path.add(point);	
};

LineTool.prototype.move = function(point) {
	//Simulate straight lines
	if (this.path) {
		if (this.straightFlag) {
			if (this.path.length > 1)
				this.path.removeSegment(1);
		}
		this.path.add(point);
	}
};

LineTool.prototype.end = function(point) {
	if (this.path) {
		if (this.straightFlag)
			this.path.add(point);
		if (this.path.length==0) {
			// TODO? replace with dot
			this.path.remove();
			console.log('zero length line');
			//lineToolPath = new paper.Path.Circle(point, DOT_SIZE/toolView.zoom);
			//lineToolPath.fillColor = 'black';
		} else {
			if (!this.straightFlag)
				this.path.simplify();
			// TODO 
			console.log('lineTool: '+this.path);
			// create 
			var action = this.curveFlag ? 
					this.sketchbook.addCurveAction(this.sketchId, this.path, this.lineColor) :
					this.sketchbook.addLineAction(this.sketchId, this.path, this.frameStyle, this.lineColor, this.fillColor);
			this.path.remove();
			return action;
		}
	}
	delete this.path;
	return null;
};

function CircleTool(project, sketchbook, sketchId) {
	// call super cons
	Tool.call(this, 'circle', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;
	this.radius = 3;
}

CircleTool.prototype = new Tool();

CircleTool.prototype.begin = function(point) {
	// activate overlay layer
	activateOverlay(this.project);
	this.frameStyle = getProperty('frameStyle', 'border');
	this.lineColor = getLineColor();
	this.fillColor = getFillColor();
	this.lineWidth = getProperty('lineWidth', 1);
	this.startPoint = point;
	this.path = new paper.Path.Circle(this.startPoint, this.radius);	
	if (this.frameStyle.indexOf('border')>=0 || !this.frameStyle)
		this.path.strokeColor = this.lineColor;
	if(this.frameStyle.indexOf('fill')>=0) {
		this.path.closed = true;
		this.path.fillColor = this.fillColor;
	}
};

CircleTool.prototype.move = function(point) {
	if (this.path) {
		this.path.remove();
	}
	// activate overlay layer
	activateOverlay(this.project);
	//Can't just subtract vectors?!!?
	var newPoint = new paper.Point(point.x - this.startPoint.x, point.y - this.startPoint.y);
	this.radius = newPoint.length;
	
	this.path = new paper.Path.Circle(this.startPoint, this.radius);
	this.path.strokeColor = 'red';
};

CircleTool.prototype.end = function(point) {
	if (this.path) {
		console.log("linewidth = ", this.path.strokeWidth);
		var action = this.sketchbook.addCircleAction(this.sketchId, this.startPoint, this.radius, this.lineWidth, this.frameStyle, this.lineColor, this.fillColor);
		this.path.remove();
		delete this.path;
		return action;
	}
	delete this.path;
	return null;
};

function getItemFromId(project, id) {
	//Get item from given element id
	var children = project.layers[1].children;
	for (var ci=0; ci<children.length; ci++) {
		var c = children[ci];
		
		console.log("child id = ", c.sketchElementId);
		
		if (c.sketchElementId === id) {
			return c;
		}
	}
	
	return null;
}

function getElementBounds(project, elements) {
	//Get bounds of all elements
	var bounds = null;
	for (var el=0; el<elements.length; ++el) {
		var elem = elements[el];
		var id = elem.id;
		var item = getItemFromId(project, id);
		if (item) {
			if (bounds==null)
				bounds = item.bounds;
			else
				bounds = bounds.unite(item.bounds);
		}
	}
	
	return bounds;
}

function MoveTool(project, sketchbook, sketchId, elements, images) {
	// call super cons
	Tool.call(this, 'move', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;
	this.elements = elements;
	this.images = images;
}

MoveTool.prototype = new Tool();

MoveTool.prototype.begin = function(point) {
	this.startPoint = point;
	activateOverlay(this.project);
	if (this.elements) {
		this.bounds = getElementBounds(this.project, this.elements);
		if (this.bounds != null) {
			this.startPoint.x = this.bounds.x + this.bounds.width/2.0;
			this.startPoint.y = this.bounds.y + this.bounds.height/2.0;
			this.bounds.x = point.x - this.bounds.width/2.0;
			this.bounds.y = point.y - this.bounds.height/2.0;
			this.path = new paper.Path.Rectangle(this.bounds);
			this.path.strokeColor = 'red';
			this.path.strokeWidth = 1;
			console.log('moving '+this.elements.length+' items');
		}
	}
	else{
		console.log("Nothing to move");
	}
}

MoveTool.prototype.move = function(point) {
	if (this.path)
		this.path.remove();
	
	activateOverlay(this.project);
	if (this.elements) {
		this.bounds.x = point.x - this.bounds.width/2.0;
		this.bounds.y = point.y - this.bounds.height/2.0;
		this.path = new paper.Path.Rectangle(this.bounds);
		
		this.path.strokeColor = 'red';
		this.path.strokeWidth = 1;
	}
}

MoveTool.prototype.end = function(point) {
	if (this.path) {
		this.path.remove();
		delete this.path;
	}
	
	if (this.elements) {
		return this.sketchbook.moveItemsAction(this.sketchId, this.elements, this.startPoint, point);
	}
	return null;
}

/** centre view tool */
function ShowAllTool(project) {
	Tool.call(this, 'showAll', project);
}

ShowAllTool.prototype = new Tool();

ShowAllTool.prototype.begin = function(point) {

	var MIN_SIZE = 10;

	// this doesn't seem to work at the moment with my indexProject
	//var bounds = project.activeLayer.bounds;
	var bounds = null;
	for (var ci in this.project.activeLayer.children) {
		var c = this.project.activeLayer.children[ci];
		var b = c.bounds;
		if (b) {
			if (bounds==null)
				bounds = new paper.Rectangle(b);
			else
				bounds = bounds.unite(b);
		}
	}
	if (bounds==null) {
		this.project.view.zoom = 1;
		this.project.view.center = new paper.Point(0,0);
	} else {
		var bw = bounds.width+MIN_SIZE;
		var bh = bounds.height+MIN_SIZE;
		var w = $(this.project.view._element).width();
		var h = $(this.project.view._element).height();
		var zoom = Math.min(MAX_ZOOM, w/bw, h/bh);
		console.log('showAll: bounds='+bw+','+bh+', canvas='+w+','+h+', zoom='+zoom+', bounds.center='+bounds.center);
		this.project.view.zoom = zoom;
		this.project.view.center = bounds.center;
	}
};

/** common zoom tool */
function ZoomTool(project, inFlag, keyZoomIn, keyZoomOut) {
	Tool.call(this,'zoom', project);
	this.inFlag = keyZoomIn ? keyZoomIn : keyZoomOut ? false : inFlag;
	this.ZOOM_INTERVAL = 20;
	this.ZOOM_RATIO = 0.05;
	this.zoomInterval = null;
	this.zoomPoint = null;
	this.zoomView = null;
	this.keyZoomIn = keyZoomIn;
	this.keyZoomOut = keyZoomOut;
};

ZoomTool.prototype.zoomIn = function() {
	if (!this.zoomView || !this.zoomPoint)
		return;
	// zoom towards zoomPoint in project space
	var zoom = this.zoomView.zoom;
	// had problems with main version - see top of file
	//console.log('zoomIn point='+zoomPoint+' zoom='+zoomView.zoom+' center='+zoomView.center);
	this.zoomView.zoom = this.zoomView.zoom*(1+this.ZOOM_RATIO);
	// limit?!
	//zoomView.zoom = Math.min(MAX_ZOOM, zoomView.zoom);
	var dx = this.zoomPoint.x-this.zoomView.center.x;
	var dy = this.zoomPoint.y-this.zoomView.center.y;
	var sdx = (this.ZOOM_RATIO*dx*zoom)/this.zoomView.zoom;
	var sdy = (this.ZOOM_RATIO*dy*zoom)/this.zoomView.zoom;
	//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);
	this.zoomView.center = new paper.Point(this.zoomView.center.x+sdx, this.zoomView.center.y+sdy);
	//console.log('- center\'='+zoomView.center);
};

ZoomTool.prototype.zoomOut = function() {
	if (!this.zoomView || !this.zoomPoint)
		return;
	// zoom away from zoomPoint in project space
	// had problems with main version - see top of file
	//console.log('zoomOut point='+zoomPoint+' zoom='+zoomView.zoom+' center='+zoomView.center);
	var zoom = this.zoomView.zoom;
	this.zoomView.zoom = this.zoomView.zoom*(1-this.ZOOM_RATIO);
	var dx = this.zoomPoint.x-this.zoomView.center.x;
	var dy = this.zoomPoint.y-this.zoomView.center.y;
	var sdx = (this.ZOOM_RATIO*dx*zoom)/this.zoomView.zoom;
	var sdy = (this.ZOOM_RATIO*dy*zoom)/this.zoomView.zoom;
	//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);
	this.zoomView.center = new paper.Point(this.zoomView.center.x-sdx, this.zoomView.center.y-sdy);
	//console.log('- center\'='+zoomView.center);
};

ZoomTool.prototype.begin = function(point) {
	this.zoomPoint = point;
	this.zoomView = this.project.view;
	var tool = this;
	this.zoomInterval = setInterval(function() { 
		if (tool.inFlag) tool.zoomIn(); else tool.zoomOut();
		}, this.ZOOM_INTERVAL);
	this.zoomIn();
};
ZoomTool.prototype.move = function(point) {
	if (this.keyZoomIn || this.keyZoomOut)
		return;
	
	this.zoomPoint = point;	
};
ZoomTool.prototype.end = function(point) {
	this.zoomPoint = point;	
	clearInterval(this.zoomInterval);
	this.zoomView = null;
};

/** common zoom tool */
function PanTool(project) {
	Tool.call(this,'pan', project);
	this.panPoint = null;
	this.panView = null;
};
PanTool.prototype.pan = function(point) {
	if (!this.panView || !this.panPoint)
		return;
	var dx = this.panPoint.x-point.x;
	var dy = this.panPoint.y-point.y;
	//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);
	this.panView.center = new paper.Point(this.panView.center.x+dx, this.panView.center.y+dy);
	//console.log('- center\'='+zoomView.center);
};
PanTool.prototype.begin = function(point) {
	this.panPoint = new paper.Point(point);
	this.panView = this.project.view;
};
PanTool.prototype.move = function(point) {
	this.pan(point);
};
PanTool.prototype.end = function(point) {
	this.pan(point);
	this.panView = null;
};

console.log('defining HighlightTool');

/** highlight tool */
function HighlightTool(project) {
	Tool.call(this, 'highlight', project);
	this.highlightedItem = null;
	this.highlightItem = null;
	console.log('created HighlightTool for project '+project);
}

HighlightTool.prototype = new Tool();

HighlightTool.prototype.clearHighlight = function() {
	if (this.highlightItem) {
		this.highlightItem.remove();
		this.highlightItem = null;
	}
	this.highlightedItem = null;
};

/** add a highlight for an item in a project */
function addHighlight(project, item) {
	project.activate();
	// highlight layer
	project.layers[2].activate();
	
	// special case clipped link to frame
	if (item instanceof paper.Group && item.sketchFrameFlag) {
		for (var ci=0; ci<item.children.length; ci++) {
			var c = item.children[ci];
			if (c.clipped && c.children.length>0) {
				item = c.children[0];			
				break;
			}
		}
	}
	
	// temporary hack to show red box at bounds as highlight
	var topLeft = item.bounds.topLeft;
	var bottomRight = item.bounds.bottomRight;
	var parent = item.parent;
	while(parent instanceof paper.Group && parent.matrix) {
		topLeft = parent.matrix.transform(topLeft);
		bottomRight = parent.matrix.transform(bottomRight);
		parent = parent.parent;
	}
	var highlightItem = new paper.Path.Rectangle(topLeft, bottomRight);
	highlightItem.strokeWidth = 1;
	project.layers[1].activate();
	highlightItem.strokeColor = 'red';
	return highlightItem;
}

HighlightTool.prototype.highlight = function(item) {
	this.highlightedItem = item;
	this.highlightItem = addHighlight(this.project, item);
	console.log('created highlight for '+item);
};

/** find item (if any) at point in project - for select and highlight */
function getItemAtPoint(project, point) {
	var tolerance = 2/project.view.zoom;
	var items = new Array();
	var children = project.layers[1].children;
	for (var ci=0; ci<children.length; ci++) {
		var c = children[ci];
		var bounds = c.bounds;
		if (c instanceof paper.Group && c.sketchFrameFlag) {
			for (var ci2=0; ci2<c.children.length; ci2++) {
				var c2 = c.children[ci2];
				if (c2.clipped && c2.children.length>0) {
					// special case clipped frame
					var topLeft = c2.children[0].bounds.topLeft;
					var bottomRight = c2.children[0].bounds.bottomRight;
					topLeft = c2.matrix.transform(topLeft);
					bottomRight = c2.matrix.transform(bottomRight);
					bounds = new paper.Rectangle(topLeft, bottomRight);
					break;
				}
			}
		}
		if (point.x>=bounds.left-tolerance &&
			point.x<=bounds.right+tolerance &&
			point.y>=bounds.top-tolerance &&
			point.y<=bounds.bottom+tolerance) {
			items.push(c);
			//console.log('- hit '+ci+':'+point.x+','+point.y+' vs '+bounds+'+/-'+tolerance);
		}
		else {
			//console.log('- missed '+ci+':'+point.x+','+point.y+' vs '+bounds+'+/-'+tolerance);
		}
	}
	//if (children.length==0)
		//console.log('- no children: '+point.x+','+point.y);
	var item = (items.length>0) ? items[items.length-1] : null;
	return item;
}

/** find item (if any) at point in project - for select and highlight */
function getItemsInBounds(project, rect) {
	var items = new Array();
	var children = project.layers[1].children;
	for (var ci=0; ci<children.length; ci++) {
		var c = children[ci];
		var bounds = c.bounds;
		if (c instanceof paper.Group && c.sketchFrameFlag) {
			for (var ci2=0; ci2<c.children.length; ci2++) {
				var c2 = c.children[ci2];
				if (c2.clipped && c2.children.length>0) {
					// special case clipped frame
					var topLeft = c2.children[0].bounds.topLeft;
					var bottomRight = c2.children[0].bounds.bottomRight;
					topLeft = c2.matrix.transform(topLeft);
					bottomRight = c2.matrix.transform(bottomRight);
					bounds = new paper.Rectangle(topLeft, bottomRight);
					break;
				}
			}
		}
		if (rect.intersects(bounds)) {
			items.push(c);
			//console.log('- hit '+ci+':'+point.x+','+point.y+' vs '+bounds+'+/-'+tolerance);
		}
		else {
			//console.log('- missed '+ci+':'+point.x+','+point.y+' vs '+bounds+'+/-'+tolerance);
		}
	}
	return items;
}

HighlightTool.prototype.checkHighlight = function(point) {
	// which item?
	/* Hit test doesn't seem to work by default on Text, or on groups
	var options = { tolerance:2, fill:true, stroke:true, segments: true };
	var res = project.hitTest(point, options);
	console.log('highlight test at '+point+' -> '+res);
	var item = (res) ? res.item : null;
	*/
	//console.log('highlight test at '+point+' in '+project);
	var item = getItemAtPoint(this.project, point);
	if (item) {
		if (item===this.highlightedItem) 
			; // no-op
		else {
			this.clearHighlight();
			this.highlight(item);
			//redraw(paper); ??
		}
	}
	else
		this.clearHighlight();

};

HighlightTool.prototype.begin = function(point) {
	this.checkHighlight(point);
};
HighlightTool.prototype.move = function(point) {
	this.checkHighlight(point);
};
HighlightTool.prototype.end = function(point) {
	this.clearHighlight();
	return null;
};

/** select tool */
function SelectTool(project, sketchbook, sketchId) {
	Tool.call(this, 'select', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.selectedItems = new Array();
	this.highlightItems = new Array();
}
SelectTool.prototype = new Tool();

SelectTool.prototype.clearHighlightItems = function() {
	for (var ix=0; ix<this.highlightItems.length; ix++) 
		this.highlightItems[ix].remove();
	this.highlightItems = new Array();
};
SelectTool.prototype.checkSelect = function(point) {
	var item = getItemAtPoint(this.project, point);
	if (item) {
		// item id?
		var elementId = getSketchElementId(item);
		
		console.log("element id = ", elementId);
		
		if (elementId) {
			if (this.selectedElementIds.indexOf(elementId)<0) {
				this.selectedItems.push(item);
				this.selectedElementIds.push(elementId);
				this.highlightItems.push(addHighlight(this.project, item));
			}
		} else {
			var sketchId = item.sketchId;
			if (sketchId) {
				if (this.selectedSketchIds.indexOf(sketchId)<0) {
					this.selectedItems.push(item);
					this.selectedSketchIds.push(sketchId);
					this.highlightItems.push(addHighlight(this.project, item));
				}
			}
			else {
				var selectionRecordId = item.selectionRecordId;
				if (selectionRecordId) {
					if (this.selectedSelectionRecordIds.indexOf(selectionRecordId)<0) {
						this.selectedItems.push(item);
						this.selectedSelectionRecordIds.push(selectionRecordId);
						this.highlightItems.push(addHighlight(this.project, item));
					}
				}
				else 
					console.log('could not select item without elementId, sketchId or selectionRecordId: '+item);
			}
		}
	}
};
SelectTool.prototype.begin = function(point) {
	this.clearHighlightItems();
	this.selectedItems = new Array();
	this.selectedElementIds = [];
	this.selectedSketchIds = [];
	this.selectedSelectionRecordIds = [];
	this.checkSelect(point);
};
SelectTool.prototype.move = function(point) {
	this.checkSelect(point);
};
SelectTool.prototype.end = function(point) {
	this.checkSelect(point);
	this.clearHighlightItems();
	var items = this.selectedItems;
	this.selectedItems = [];
	// we'll use an action for this although it doesn't actually modify the sketchbook state!
	return this.sketchbook.selectItemsAction(this.sketchId, items);
};

/** select tool */
function SelectAreaTool(project, sketchbook, sketchId) {
	Tool.call(this, 'select', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.selectedItems = new Array();
	this.highlightItems = new Array();
}
SelectAreaTool.prototype = new Tool();

SelectAreaTool.prototype.clearHighlightItems = function() {
	for (var ix=0; ix<this.highlightItems.length; ix++) 
		this.highlightItems[ix].remove();
	this.highlightItems = new Array();
};
SelectAreaTool.prototype.checkArea = function(from, to) {
	var bounds = new paper.Rectangle(new paper.Point(from.x, from.y), new paper.Point(to.x, to.y));
	var items = getItemsInBounds(this.project, bounds);
	this.clearHighlightItems();
	this.selectedItems = new Array();
	this.selectedElementIds = [];
	this.selectedSketchIds = [];
	this.selectedSelectionRecordIds = [];
	
	// changed?
	for (var ii=0 in items) {
		var item = items[ii];
		// item id?
		var elementId = getSketchElementId(item);
		if (elementId) {
			if (this.selectedElementIds.indexOf(elementId)<0) {
				this.selectedItems.push(item);
				this.selectedElementIds.push(elementId);
				this.highlightItems.push(addHighlight(this.project, item));
			}
		} else {
			var sketchId = item.sketchId;
			if (sketchId) {
				if (this.selectedSketchIds.indexOf(sketchId)<0) {
					this.selectedItems.push(item);
					this.selectedSketchIds.push(sketchId);
					this.highlightItems.push(addHighlight(this.project, item));
				}
			}
			else {
				var selectionRecordId = item.selectionRecordId;
				if (selectionRecordId) {
					if (this.selectedSelectionRecordIds.indexOf(selectionRecordId)<0) {
						this.selectedItems.push(item);
						this.selectedSelectionRecordIds.push(selectionRecordId);
						this.highlightItems.push(addHighlight(this.project, item));
					}
				}
				else 
					console.log('could not select item without elementId, sketchId or selectionRecordId: '+item);
			}
		}
	}
};
SelectAreaTool.prototype.begin = function(point) {
	this.clearHighlightItems();
	this.selectedItems = new Array();
	this.selectedElementIds = [];
	this.selectedSketchIds = [];
	this.selectedSelectionRecordIds = [];
	this.startPoint = point;
	this.checkArea(this.startPoint, point);
};
SelectAreaTool.prototype.move = function(point) {
	if (this.path) {
		this.path.remove();
	}
	// activate overlay layer
	activateOverlay(this.project);
	this.path = new paper.Path.Rectangle(this.startPoint, point);
	this.path.strokeColor = 'red';
	this.path.strokeWidth = 1;

	this.checkArea(this.startPoint, point);
};
SelectAreaTool.prototype.end = function(point) {
	this.checkArea(this.startPoint, point);
	if (this.path) {
		this.path.remove();
		this.path = null;
	}
	this.clearHighlightItems();
	var items = this.selectedItems;
	this.selectedItems = [];
	// we'll use an action for this although it doesn't actually modify the sketchbook state!
	return this.sketchbook.selectItemsAction(this.sketchId, items);
};

/** common zoom tool */
function PanAndZoomTool(project, sketchbook, sketchId, keyPanDirection) {
	Tool.call(this,'panAndZoom', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.panPoint = null;
	this.panView = null;
	this.pannedFlag = false;
	this.highlightItem = null;
	this.keyPanDirection = keyPanDirection;
	this.PAN_INTERVAL = 20;
};
PanAndZoomTool.prototype.pan = function(point) {
	// from Pan
	if (!this.panView || !this.panPoint)
		return;
	var dx = this.panPoint.x-point.x;
	var dy = this.panPoint.y-point.y;
	if (dx!=0 || dy!=0) {
		this.pannedFlag = true;
		//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);
		this.panView.center = new paper.Point(this.panView.center.x+dx, this.panView.center.y+dy);
		//console.log('- center\'='+zoomView.center);
	}
};
PanAndZoomTool.prototype.begin = function(point) {
	// from Pan
	this.panPoint = new paper.Point(point);
	this.lastPoint = new paper.Point(point);
	
	this.panView = this.project.view;
	if (this.keyPanDirection > 0) {
		
		console.log('dir = '+this.keyPanDirection);
		
		this.pannedFlag = true;
		this.selectedItem = null;
		//Ensure we keep panning
		var tool = this;
		this.panInterval = setInterval(function() {
			switch (tool.keyPanDirection) {
				case PAN_DIRECTION_RIGHT:
					tool.lastPoint.x += PAN_INCREMENT;
					tool.pan(tool.lastPoint);
					break;
				case PAN_DIRECTION_LEFT:
					tool.lastPoint.x -= PAN_INCREMENT;
					tool.pan(tool.lastPoint);
					break;
				case PAN_DIRECTION_UP:
					tool.lastPoint.y -= PAN_INCREMENT;
					tool.pan(tool.lastPoint);
					break;
				case PAN_DIRECTION_DOWN:
					tool.lastPoint.y += PAN_INCREMENT;
					tool.pan(tool.lastPoint);
					break;
				default:
					break;
			}
		}, this.PAN_INTERVAL);
		return;
	}
	this.pannedFlag = false;
	this.selectItem = getItemAtPoint(this.project, point);
	if (this.selectItem) {
		this.highlightItem = addHighlight(this.project, this.selectItem);
	}
};
PanAndZoomTool.prototype.move = function(point) {
	// from Pan
	if (this.keyPanDirection <= 0)
		this.pan(point);
};
PanAndZoomTool.prototype.end = function(point) {
	// from Pan
	if (this.keyPanDirection > 0){
		clearInterval(this.panInterval);
	}
	else
		this.pan(point);
		
	if (this.highlightItem) {
		this.highlightItem.remove();
		this.highlightItem = null;
	}
	var selectFlag = !this.pannedFlag;
	var items = [];
	if (selectFlag) {
		if (this.selectItem) {
			items.push(this.selectItem);
		}
	}

	this.panView = null;
	this.selectedItem = null;

	// we'll use an action for this although it doesn't actually modify the sketchbook state!
	if (selectFlag)
		// select and zoom
		return this.sketchbook.selectItemsAction(this.sketchId, items, this.project);
	
	return null;
};

/** order to back tool */
function OrderToBackTool(project, sketchbook, sketchId) {
	//SelectTool.call(this, project, sketchbook, sketchId);
	//this.name = 'orderToBack';
	Tool.call(this, 'orderToBack', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.selectedItems = new Array();
	this.highlightItems = new Array();
}
OrderToBackTool.prototype = new SelectTool();

OrderToBackTool.prototype.end = function(point) {
	this.checkSelect(point);
	this.clearHighlightItems();
	var items = this.selectedItems;
	this.selectedItems = [];
	// we'll use an action for this although it doesn't actually modify the sketchbook state!
	return this.sketchbook.orderToBackItemsAction(this.sketchId, items);
};


function CopyToSketchTool(project, sketchbook, sketchId, elements, images) {
	Tool.call(this, 'copyToSketch', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.elements = elements;
	this.images = images;
}
CopyToSketchTool.prototype = new Tool();

CopyToSketchTool.prototype.begin = function(point) {
	this.startPoint = point;
	// activate overlay layer
	activateOverlay(this.project);
	if (this.elements) {
		var items = elementsToPaperjs(this.elements, this.sketchbook, this.images);
		this.group = new paper.Group(items);
		console.log('copying '+items.length+' items');
	}
	else
		this.group = new paper.Group();
	this.elementBounds = new paper.Rectangle(this.group.bounds);
	this.group.visible = false;
};
CopyToSketchTool.prototype.move = function(point) {
	if (this.path) {
		this.path.remove();
	}
	// activate overlay layer
	activateOverlay(this.project);
	this.path = new paper.Path.Rectangle(this.startPoint, point);
	this.path.strokeColor = 'red';
	this.path.strokeWidth = 1;

	this.group.bounds = new paper.Rectangle(this.startPoint, point);
	this.group.visible = true;
};
CopyToSketchTool.prototype.end = function(point) {
	if (this.path) {
		this.path.remove();
		delete this.path;
	}
	if (this.group) {
		this.group.remove();
		delete this.group;
	}
	if (this.elements) {
		var bounds = new paper.Rectangle(this.startPoint, point);
		return this.sketchbook.addElementsAction(this.sketchId, this.elements, this.elementBounds, bounds);
	}
	return null;
};

function FrameTool(project, sketchbook, sketchId, description) {
	Tool.call(this, 'frame', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;	
	this.description = description;
	this.frameStyle = getProperty('frameStyle', 'border');
	this.lineColor = getLineColor();
	this.fillColor = getFillColor();
	this.lineWidth = getProperty('lineWidth', 1);
	this.showLabel = getProperty('showLabel', 'frame');
	this.textColor = getTextColor();
	this.textSize = getProperty('textSize', 12);
	this.textVAlign = getProperty('textVAlign', 'middle');
}
FrameTool.prototype = new Tool();

FrameTool.prototype.begin = function(point) {
	this.startPoint = point;
};
FrameTool.prototype.move = function(point) {
	if (this.path) {
		this.path.remove();
	}
	// activate overlay layer
	activateOverlay(this.project);
	this.path = new paper.Path.Rectangle(this.startPoint, point);
	this.path.strokeColor = 'red';
	this.path.strokeWidth = 1;
};
FrameTool.prototype.end = function(point) {
	if (this.path) {
		this.path.remove();
		delete this.path;
	}
	var bounds = new paper.Rectangle(this.startPoint, point);
	return this.sketchbook.addFrameAction(this.sketchId, this.description, bounds, this.frameStyle, this.lineColor, this.lineWidth, this.fillColor, this.showLabel, this.textColor, this.textSize, this.textVAlign);
};

function TextTool(project, sketchbook, sketchId, content) {
	// call super cons
	Tool.call(this, 'text', project);
	this.sketchbook = sketchbook;
	this.sketchId = sketchId;
	this.content = content;
	//this.fontSize = fontSize;
}

TextTool.prototype = new Tool();

TextTool.prototype.begin = function(point) {
	// activate overlay layer
	activateOverlay(this.project);
	this.text = new paper.PointText(point);
	this.text.characterStyle.fillColor = getTextColor();
	this.text.paragraphStyle.justification = getProperty('textJustify', 'center');
	this.text.characterStyle.fontSize = getProperty('textSize', 12); //default
	this.text.content = this.content;	
};

TextTool.prototype.move = function(point) {
	if (this.text)
		this.text.point = point;
};

TextTool.prototype.end = function(point) {
	if (this.text) {
		this.text.point = point;
		var action = this.sketchbook.addTextAction(this.sketchId, this.text);
		this.text.remove();
		return action;
	}
	delete this.text;
	return null;
};
