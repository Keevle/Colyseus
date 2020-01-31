function GetPluginSettings()
{
	return {
		"name":			"Colyseus",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Colyseus",				// this is used to identify this plugin and is saved to the project; never change it
		"version":      "0.12.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Allows you to develop develop multiplayer games using Colyseus.",
		"author":		"Endel Dreyer",
		"help url":		" ",
		"category":		"Web",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"dependency": 	"colyseus.js",
		"flags":		0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
AddCondition(0, cf_trigger, "On Open", "Client", "On Open", "Triggered when connection with server is opened.", "OnOpen");

AddCondition(1, cf_trigger, "On Error", "Client", "On Error", "Triggered when an error happened on the server.", "OnClientError");

AddCondition(2, cf_trigger, "On Close", "Client", "On Close", "Triggered when connection with server is closed.", "OnClose");

AddCondition(3, cf_trigger, "On Join", "Room", "On Join", "Triggered when joined successfully into a room.", "OnJoinRoom");

AddCondition(4, cf_trigger, "On Leave", "Room", "On Leave", "Triggered when left from a room.", "OnLeaveRoom");

AddCondition(5, cf_trigger, "On Error", "Room", "On Error", "Triggered when an error happened on the server.", "OnRoomError");

AddStringParam("Type", "The type of the message being sent/broadcasted.");
AddCondition(6, cf_trigger, "On Message", "Room", "On Message ({0})", "Triggered when the room broadcasts a message, or sends a message directly to this client.", "OnMessage");

AddCondition(7, cf_trigger, "On state change", "Room", "On state change", "Triggered when the state of the room changes.", "OnStateChange");

AddStringParam("Path", "Path of the variable you'd like to listen for. e.g. \"entities/:id/:axis\"");
AddComboParamOption("Any");
AddComboParamOption("Add");
AddComboParamOption("Replace");
AddComboParamOption("Remove");
AddComboParam("Operation", "You may limit to listen for \"add\", \"replace\" or \"remove\" operations on this variable. \"any\" catches any operations.");
AddCondition(8, cf_trigger, "Listen", "Room", "Listen for {0} ({1} operations)", "Triggered when the room broadcasts a message, or sends a message directly to this client.", "OnRoomListen");


AddStringParam("Scheam","Schema to listen for");
AddCondition(9, cf_trigger,"On add","Schema","On add at {0}","Triggers when an item is added to ArraySchema or MapSchema.","OnSchemaAdd");

AddStringParam("Path","Path of the variable you'd like to listen for. e.g. \"entities\" ");
AddCondition(10, cf_trigger,"On Field Change","Schema","On field change at {0}","Triggers when a field is changed inside a Schema instance.","OnSchemaFieldChange");

AddStringParam("Path","Path of the variable you'd like to listen for. e.g. \"entities\" ");
AddCondition(11, cf_trigger,"On Change","Schema","On change at {0}","Triggers when an item is changed inside ArraySchema or MapSchema.","OnSchemaChange");

AddStringParam("Path","Path of the variable you'd like to listen for. e.g. \"entities\" ");
AddCondition(12, cf_trigger,"On Remove","Schema","On remove at {0}","Triggers when an item is removed from ArraySchema or MapSchema.","OnSchemaRemove");

AddStringParam("Index","Index value (e.g. Colyseus.SessionId) ");
AddCondition(14,0,"Is index","Schema","Is index {0}","Only available for Arrays and Maps. Check if index of current item is equals to provided value.","IsIndex");

AddStringParam("field","Field name");
AddCondition(15,0,"Is field","Schema","Is field {0}"," Only available during \"On change\" of a direct object. Checks if a field name has changed.","IsField");
////////////////////////////////////////

// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
AddStringParam("ServerUrl", "Enter the url of the server to connect to","localhost:1280");
AddAction(0, af_none, "SetEndpoint", "Client", "Open connection to {0}", "Connect to a server url", "SetEndpoint");

AddAction(1, af_none, "Disconnect", "Client", "Disconnect", "Close connection with server", "Disconnect");

AddStringParam("Room name", "Room name");
AddStringParam("Options", "The \"requestJoin\" options, in JSON format.");
AddAction(2, af_none, "Join Room", "Room", "Join room {0} with options {1}.", "Join a room by name", "JoinRoom");

AddStringParam("Room name", "Room name");
AddStringParam("Options", "The \"requestJoin\" options, in JSON format.");
AddAction(3, af_none, "JoinCrate", "Room", "Join or create room {0} with options {1}.", "Jopin or Create a room", "JoinOrCreateRoom");

AddStringParam("Room name", "Room name");
AddStringParam("Options", "The \"requestJoin\" options, in JSON format.");
AddAction(5, af_none, "CreateRoom", "Room", "Create room {0} with options {1}.", "Create a room", "CreateRoom");

AddStringParam("roomId", "Room name");
AddStringParam("sessionid", "The \"requestJoin\" options, in JSON format.");
AddAction(6, af_none, "ReconnectRoom", "Room","Reconnect to a room by ID", "ReconnectRoom");

AddAnyTypeParam("Type", "Type of the message.");
AddAnyTypeParam("Message", "JSON representation of the message. Messages arrive on server-side at \"onMessage\".");
AddAction(7, af_none, "Send message", "Room", "Send {0} with {1}", "Send message to a room", "RoomSend");

AddAction(8, af_none, "Leave room", "Room", "Leave from the room", "Disconnect client from the room.", "RoomLeave");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddStringParam("Variable", "Name of the variable. e.g. \"id\", \"number\", \"axis\"");
AddExpression(0, ef_return_any, "Path", "General", "Path", "A variable present in the path you're listening to.");

AddExpression(1, ef_return_any, "Value", "General", "Value", "The value you're listening to. (Only avaliable during Listen)");

AddStringParam("Variable", "A dot separated path to the variable. e.g. \"messages.0\"");
AddExpression(2, ef_return_any, "ValueAt", "General", "ValueAt", "The nested value you're listening to. (Only avaliable during Listen)");

AddStringParam("Variable", "A dot separated path to the variable. e.g. \"messages.0\"");
AddExpression(3, ef_return_any, "State", "General", "State", "Returns a value from room's state");

AddExpression(4, ef_return_any, "SessionId", "General", "SessionId", "Unique sessionId of the current user");

AddExpression(5, ef_return_any, "PreviousValue", "General", "PreviousValue", "Get previous value from current field. Only available during \"On change\" on an instance variable. Not avaialble for arrays and maps.");

AddExpression(6, ef_return_any, "CurrentField", "General", "CurrentField", "Get current field being changed. Available during \"On field change\" ");

AddExpression(7,ef_return_any,"CurrentIndex,","General","CurrentIndex","Get index of current item. Available during \"On Add\", \"On Change\" or \"On Remove\" ")

AddExpression(8,ef_return_any,"CurrentValue","General","CurrentValue","Get value from current item")

AddStringParam("Variable", "A dot separated path to the variable. e.g. \"messages.0\" ");
AddExpression(9,ef_return_any,"CurrentValueAt","General","CurrentValueAt","Get nested value from current item")

AddStringParam("Variable", "Declare a JSON value.");
AddExpression(10,ef_return_string,"JSON","General","JSON","Declare a JSON value.")



////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_text, 	"End point",		"ws://localhost:2567",		"Endpoint of the Colyseus server")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
