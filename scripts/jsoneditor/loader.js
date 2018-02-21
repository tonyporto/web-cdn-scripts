/*! "LOADJS v3.5.1 (A tiny async loader / dependency manager for modern browsers)
 * https://github.com/muicss/loadjs
 */
loadjs=(function(){var devnull=function(){},bundleIdCache={},bundleResultCache={},bundleCallbackQueue={};function subscribe(bundleIds,callbackFn){bundleIds=bundleIds.push?bundleIds:[bundleIds];var depsNotFound=[],i=bundleIds.length,numWaiting=i,fn,bundleId,r,q;fn=function(bundleId,pathsNotFound){if(pathsNotFound.length)depsNotFound.push(bundleId);numWaiting--;if(!numWaiting)callbackFn(depsNotFound);};while(i--){bundleId=bundleIds[i];r=bundleResultCache[bundleId];if(r){fn(bundleId,r);continue;}
q=bundleCallbackQueue[bundleId]=bundleCallbackQueue[bundleId]||[];q.push(fn);}}
function publish(bundleId,pathsNotFound){if(!bundleId)return;var q=bundleCallbackQueue[bundleId];bundleResultCache[bundleId]=pathsNotFound;if(!q)return;while(q.length){q[0](bundleId,pathsNotFound);q.splice(0,1);}}
function loadFile(path,callbackFn,args,numTries){var doc=document,async=args.async,maxTries=(args.numRetries||0)+1,beforeCallbackFn=args.before||devnull,isCss,e;numTries=numTries||0;if(/(^css!|\.css$)/.test(path)){isCss=true;e=doc.createElement('link');e.rel='stylesheet';e.href=path.replace(/^css!/,'');}else{e=doc.createElement('script');e.src=path;e.async=async===undefined?true:async;}
e.onload=e.onerror=e.onbeforeload=function(ev){var result=ev.type[0];if(isCss&&'hideFocus'in e){try{if(!e.sheet.cssText.length)result='e';}catch(x){result='e';}}
if(result=='e'){numTries+=1;if(numTries<maxTries){return loadFile(path,callbackFn,args,numTries);}}
callbackFn(path,result,ev.defaultPrevented);};if(beforeCallbackFn(path,e)!==false)doc.head.appendChild(e);}
function loadFiles(paths,callbackFn,args){paths=paths.push?paths:[paths];var numWaiting=paths.length,x=numWaiting,pathsNotFound=[],fn,i;fn=function(path,result,defaultPrevented){if(result=='e')pathsNotFound.push(path);if(result=='b'){if(defaultPrevented)pathsNotFound.push(path);else return;}
numWaiting--;if(!numWaiting)callbackFn(pathsNotFound);};for(i=0;i<x;i++)loadFile(paths[i],fn,args);}
function loadjs(paths,arg1,arg2){var bundleId,args;if(arg1&&arg1.trim)bundleId=arg1;args=(bundleId?arg2:arg1)||{};if(bundleId){if(bundleId in bundleIdCache){throw"LoadJS";}else{bundleIdCache[bundleId]=true;}}
loadFiles(paths,function(pathsNotFound){if(pathsNotFound.length)(args.error||devnull)(pathsNotFound);else(args.success||devnull)();publish(bundleId,pathsNotFound);},args);}
loadjs.ready=function ready(deps,args){subscribe(deps,function(depsNotFound){if(depsNotFound.length)(args.error||devnull)(depsNotFound);else(args.success||devnull)();});return loadjs;};loadjs.done=function done(bundleId){publish(bundleId,[]);};loadjs.reset=function reset(){bundleIdCache={};bundleResultCache={};bundleCallbackQueue={};};loadjs.isDefined=function isDefined(bundleId){return bundleId in bundleIdCache;};return loadjs;})();
/*
 * LOAD JSON FILE EDITOR SCRIPTS
 */
var editorDir = "http://tonyporto.github.io/web-cdn-scripts/scripts/jsoneditor/";

//LOAD CSS FILES
loadjs([
	'css!' + editorDir + 'jsoneditor.css',
	editorDir + 'jsoneditor.js',
	editorDir + 'filereader.js',
	editorDir + 'FileSaver.min.js',
	'http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'], 'jsonInit', {
  success: function() {
  
  
var container = document.getElementById("jsoneditor");

var options = {
    mode: 'tree',
    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
    },

};

var editor = new JSONEditor(container, options, json);


	editor.set(json);
	var json = editor.get(json);

	// Load a JSON document
	if (document.getElementById('loadDocument')) {
		FileReaderJS.setupInput(document.getElementById('loadDocument'), {
			readAsDefault: 'Text',
			on: {
				load: function (event, file) {
					editor.setText(event.target.result);
				}
			}
		});
	}
	// Save a JSON document
	if (document.getElementById('saveDocument')) {
		document.getElementById('saveDocument').onclick = function () {
			var blob = new Blob([editor.getText()], {type: 'application/json;charset=utf-8'});
			
			var filename = location.href.substr(location.href.lastIndexOf('/') + 1).split('.')[0];
			saveAs(blob, filename+".json");
		};
	}
 
  
  },
  async: false
  }
);

