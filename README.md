# computer-aided-sketching
Trajectory sketching tool for user experience designers 
## <a name="_toc366063808"></a>**4.1 Introduction**
The trajectories sketching tool used for this research was developed by Professor Chris Greenhalgh from the University of Nottingham. As mentioned before, the concept of trajectories can be a good aid for design user experience over different space, roles, time, and interfaces. Therefore, the designers may need to use trajectories sketching to explore their idea of user journey. 

This tool has been designed to manage and sketch trajectories. In particular, it can add notations, frame, line and text for trajectories. Furthermore, there are also some innovated features, such as demonstration of the sketches in different sequence, selection history. The specific features will be explained in later section. Anyway, the current tool requires the browser support HTML5, and Google Chrome as recommended running browser.
### <a name="_toc366063809"></a>**4.1.1 Interface and Layout**
The tool consists of sketching page (start page), sequence, and index. The start page is showed as below:


![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 020](https://github.com/jinushini/computer-aided-sketching/assets/5149169/fec7512b-5ea2-4619-bc8d-526be780a2f6)

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.001.png)

<a name="_toc366019417"></a>                       <a name="_toc366019418"></a>Figure 10. Sketcher start page 

There are some main sections in this page. Firstly, the top row of buttons consists of opening and loading a file, merging, naming a new file and clears all buttons. Below that, there are some tabs which enable users to quickly switch between three interfaces. In the lower left corner, the section includes all properties for selected and new sketch. User can edit text content, color, size, style, align, width for line, frame and text. Beside the properties section are action buttons and selection history. The details are described in following chapter.
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 003](https://github.com/jinushini/computer-aided-sketching/assets/5149169/55933ae3-36bd-4b4a-b8ce-0e28c0377202)



Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.002.png)

<a name="_toc366019419"></a>                        <a name="_toc366019420"></a>Figure 11. Sequence page

The sequence page shows in figure 11. The center pane is divided into three panes. They are current sequence, new sequence, and current frame view.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.003.png)

<a name="_toc366019421"></a>                         <a name="_toc366019422"></a>Figure 12. Index page

The index page only has one pane in center of page.
### <a name="_toc366063810"></a>**4.1.2 Key Functions**
In general (without details of generic functions like zoom-in or out, color options, etc.) The functions of this trajectories sketching tool are as below:

![](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.004.png)

<a name="_toc366019424"></a>                     <a name="_toc366019425"></a>Figure 13 File buttons

- Loading and saving a sketch:  Click the choose file button then select the sketch.jeson file from dialog box. After that, user can load that sketch by selecting load button. Thus, the sketch has been loaded and ready to be edited.

![](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.005.png)

<a name="_toc366019426"></a>                     <a name="_toc366019427"></a>Figure 14 action buttons

- Drawing line (trajectories): The user can select line tool from action buttons. Then, they can edit the line attributes on properties section. The editable attributes are style, line color, line width, and fill color. The style attributes include border, fill and both, which are very helpful to edit some particular shapes. The below example is created by line tool. The arrow is in common used for trajectories sketching.

![A red arrow pointing up
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 006](https://github.com/jinushini/computer-aided-sketching/assets/5149169/15d8f62f-9f34-4f4e-b0a9-c4350022dbbd)

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.006.png)

<a name="_toc366019428"></a><a name="_toc366019429"></a>Figure 15 Sketching Arrow.

- Text annotations: It is an important function in trajectories sketching. Usually, designers need to add annotations for trajectories and transitions. The different font size and color can be chose in properties section. Therefore, designers are able to make personalized annotations for their trajectories. Moreover, the text can be URL and opened by open [E] button within action buttons.

- Insert picture and frame: In order to create animated trajectory, designer might need to insert some live picture and frame them. By using the frame button and load image, it will be easily done. Similarly, the properties are editable as well. Furthermore, the properties can be altered after drawing completed. User can click select [Q] button and move the mouse into canvas. Click selectable area then edit them in properties.

![A screenshot of a video game

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.007.png)

<a name="_toc366019430"></a>            <a name="_toc366019431"></a>Figure 15. The example of insert a picture and add a frame.

- Selection history:  The selection history has been designed in order to reduce the memorized loads. The selected items will be displayed in this pane. The items can be repeatedly selected then copy into canvas through Copy [D].  

- Create sequences: This is an innovative function which enables designer to manage and create sequence of frames. All frames will be displayed in left hand pane as below. Designer can select each frame then content can be viewed in right hand pane. Thus, the designers are able to show an animated sequence of events through a trajectory so that they can get a sense of where the participants go and in what order. Moreover, designers can edit the sequence of frames in middle pane. It enables designers to make a customized sequence of frame.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.008.png)

<a name="_toc366019432"></a>                      <a name="_toc366019433"></a>Figure 16 Example of Sequence.
## <a name="_toc366063811"></a>4.2 Software Components
In this section, the main software modules are illustrated, which is the most relevant to evaluation and enhancement of software in this dissertation (source code in Appendix1).

In general the software utilizes two JavaScript libraries Paper.js and JQuery. Paper.js is as an application programming interface (API) over HTML5 canvas. It is to manipulate vector graphics. Besides, the general document object model (DOM) is manipulated by JQuery. It has third-party utilities to support local files (jquery.imagesloaded.min.js，jquery-1.7.2.min.js).

There are several key software modules (Appendix 1). Sketcher2.html has the static HTML and sketcher2.css contains the CSS language for layout. The software design pattern works as Model View Controller (MVC). In this pattern, the sketcher2.js is as view or controller. Sketchbook.js is data model which support for sketcher2.js. It returns action to select a sequence item. Sketchertools.js integrates the multiple drawing and manipulation tools. It define the class of different tool like LineTool ,FrameTool, ZoomTool, PanTool, HighlightTool, etc.
## <a name="_toc366063812"></a>**4.3 Heuristic Analysis**
In this chapter I am going to utilize Nielsen 10 principles to assess the current software. It is possible to find out the weakness of current tool and fix them. The following heuristics and definitions refer to the revised version of Nielsen’s Heuristics [32].

**Visibility of system status**

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.009.png)In this heuristic, the software should always keep users informed about what is going on, through appropriate feedback within reasonable time. Therefore, our software should appropriately provide some reminders to users about the progress status. In Chris Greenhalgh’s trajectory sketching tool, either user uploads the photos or select particular frame in detail pane. As long as it appeals at selected history, the operation is successful. It is a very good feature because it can inform current status to users. After picture uploaded, it will be displayed in history pane (Figure17).



![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 007](https://github.com/jinushini/computer-aided-sketching/assets/5149169/9a94e190-fec6-43a2-8821-26e7af61f38f)


Figure 17 Selection History

- Conformity:  High

**Match between system and the real world**

In this heuristic, the software should speak the user’s language rather than system-oriented terms. This means this software should adapt the real-world, and do not use any technical languages and terms. Obviously, the software does not have any system-oriented terms or technical languages. 

- Conformity: High

**User control and freedom**

In heuristic users often choose functions by mistake and will need a clearly marked “emergency exit”. The ‘Delete’ buttons can remove the undesired frame. Furthermore, the properties of line, text or frame can either be edited beforehand or afterward selection. For example, Click on the Select [Q] button and as user move the mouse over sketches then each selectable item will have a red border. Click the red border then it will be displayed in selection history. All attribute of this item will become editable.

- Conformity: High

**Consistency and standards**

In heuristic user should not have to wonder whether different words, situations, or actions mean the same thing. It is believed that “The same information should be presented in the same location on all screens and dialog boxes and it should be formatted in the same way” [31]. Through evaluation of this software, all buttons have the standard layout. The general location of dialog-box is consistent over all interfaces. 

- Conformity: High

**Error prevention**

In this heuristic, the software should eliminate error-prone conditions or check for them and present users with a confirmation option. By inspecting any error-prone conditions in our prototype, it does not have error prevention when loading files. The new user might click the load button directly. Similar, the frame and line buttons is error-prone as well. It is possible that user try to add the text and frame without key-in texts and select style in properties. Therefore, it is reasonable to solve this problem in the first place. We can design an alert-box after button clicked.

- Issue: User may waste time on uncertain buttons.
- Conformity: Low
- Solutions:  Design the alert-box when they click buttons.

**Recognition rather than recall**

In heuristic the app should minimize the user’s memory load. In this prototype, the ‘Selection History’ can be a good aid for reduce the user’s memory load. When user does ongoing jobs, they can reselect items from this pane. This is useful for copying and pasting content into the sketch. User are able to copy and paste content, image and background into a new sketch. Furthermore, when people use sketch method (line, text, frame), the unavailable options will turn grey in the properties pane. Thus, user will understand corresponding attributes.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.010.png)

Figure 18 Example of unavailable attributes for ‘line’

- Conformity: High.


**Flexibility and efficiency of use**

In this heuristic, the app should be flexibility and efficiency when user wants to do any orders. In this software, some shapes can be create by ‘line’ like triangle, arrow. However, it is very hard to draw a regular circle by line, though circle is an important symbol in trajectories (represent transitions). Therefore, it should be provided in the trajectories sketching tool.

- Issue: Unable to draw circle.
- Conformity: medium
- Solutions:  Add circle sketching tool.

**Aesthetic and minimalist design**

In heuristic dialogues should be aesthetic and minimalist. In this prototype, the interfaces are rough and without aesthetic. Furthermore, most buttons is textual (Figure 14). The style is also monotonous. In order to simplify interface, a drop-down menu may be applied. Besides, personalized icons may be better option than textual buttons.

- Issue: The interface is monotonous.
- Conformity: Low
- Solution: Embellish the interfaces by icon and drop-down menu.

**Help users recognize, diagnose, and recover from errors**

In heuristic error messages of software should be expressed in plain language precisely indicating the problem and solution. Anyway, it is not necessary of error messages for this software. Even the internet is disconnected, the software is still working once it has been loaded. Furthermore, once the sketch has been deleted by mistake, it still can be reselected in the selection history.

- Conformity: High

**Help and documentations**

Follow this heuristic, the software may be necessary provide the help and documentation for users. This software has the particular interface to provide extra help and documentation. Specifically, it is very easy to find. Users only need to click the ‘help’ at the menu bar. Then, a general overview page is linked.** However, there are still some uncertain action buttons, such as ‘Back [Backspace]’, ‘select [Q]’.The user may do not understand the function of these buttons.

- Issue:  Undescribed buttons.
- Conformity: Medium
- Solution: Add the hints of buttons.

In summary, this software is designed very well. This trajectory sketching tool is considered easily to use. Specifically, the layout is simple and clear. It uses the natural and understandable user’s language rather than system-oriented terms, so that user can effortlessly understand the meaning of each button and dialog-box. Moreover, it minimizes the user’s memory load by selection history and dimmed buttons. However, there are some problems has been discovered as mentioned above. For example, the undescribed buttons, alert-box, unaesthetic interface. These problems are going to be solved by enhancement.




![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 022](https://github.com/jinushini/computer-aided-sketching/assets/5149169/5616eeb2-9b9c-4abd-a64c-f9868dd9c1da)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 021](https://github.com/jinushini/computer-aided-sketching/assets/5149169/5194291b-7116-4ce0-8feb-4855160f7f8a)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 020](https://github.com/jinushini/computer-aided-sketching/assets/5149169/60c99436-029b-4c96-8f41-5b42d4277b3c)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 019](https://github.com/jinushini/computer-aided-sketching/assets/5149169/9203d90d-6f0d-4191-8b2f-b602810bb26d)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 018](https://github.com/jinushini/computer-aided-sketching/assets/5149169/cb98b8f3-267b-4d8c-94f7-9301b3b41440)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 017](https://github.com/jinushini/computer-aided-sketching/assets/5149169/bb4a5bb5-3389-4634-93e5-b12e216b3588)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 016](https://github.com/jinushini/computer-aided-sketching/assets/5149169/37500dae-d20c-4b19-8d3e-db71d3a36f25)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 015](https://github.com/jinushini/computer-aided-sketching/assets/5149169/b1eac5af-5518-4d42-868e-0ffb4ce4aa1c)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 014](https://github.com/jinushini/computer-aided-sketching/assets/5149169/4c7634a3-bb4e-450e-86cb-01eca6678042)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 013](https://github.com/jinushini/computer-aided-sketching/assets/5149169/02083510-c879-4193-beec-6a2155ea0c62)
![Aspose Words 5d8711ea-78fd-496f-8458-94f445b20b43 012](https://github.com/jinushini/computer-aided-sketching/assets/5149169/437556ea-3b8d-471a-9f79-140f5ba5d8f8)



# <a name="_toc366063813"></a>**5 Enhancements and Implementation**
This chapter illustrates the specific design and implementation of enhanced software. In this dissertation, the requirements have been identified from previous chapters (literature review and heuristic analysis). 

The software development processes is based on waterfall model. Winston W. Royce described first formal waterfall model in 1970. The general construction of waterfall model is as figure below. It usually consists of requirements, design, and coding, testing, maintenance. 

![File:Waterfall model (1).svg](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.011.png)

Figure 19. The unmodified "waterfall model". [22]

## <a name="_toc366063814"></a>**5.1 Software requirements specification**
In heuristic analysis the key functions and issues of Greenhalgh Christopher’s software has been described. We can see that trajectories sketching tool have two key parts which are sequence and sketch. They are not only sketch trajectories, but also arrange the events in order. Thus, designers could understand the moment of when participant in and out. Moreover, there are some mandatory shapes should be draw by software，for example, the line and frame represents the trajectories and events respectively. 


The specification of enhanced software has been confirmed according to results of heuristic analysis. The requirements have been done in original version are:

- Ability to draw trajectories (line).
- Ability to draw frame.
- Ability to add notations (text).
- It should have editable attributes of line, frame, text( color, style, size)
- Ability to demonstrate and edit sequence of sketch
- Ability to load and save the sketch.
- Ability to reselect and copy the paste selections
- Ability to add the images.
- Ability to search the keywords and make an index of sketches.

The requirements of new version are:

- Ability to draw circle.
- It should have editable attributes of circle ( color, style, line width)
- Ability to remind user when they click load, frame and text.
- It should provide hits for action buttons.
- GUI elements replace textual interface.
- It should have a more structured layout.

Anyway, there are some constraints in this development as well. It is browser-based software, so that the development should be done by web and script programming. Furthermore, the software is only supported by particular browsers due to HTML5. The program is also not stable in browser sometimes. For example, the Google chrome was crashed sometimes, but it is fine in IE 10.

##
## **5.2 Enhanced Design**
In this chapter, we are going to talk about the changes of original software. Furthermore, the design rationale indicates the reason of why the software was designed like this, and any purpose of particular design.

### <a name="_toc366063816"></a>**5.2.1 Aesthetic Improvement**
“Aesthetics has been an object of interest in many disciplines such as philosophy as well as psychology and most recently in the field of human-computer interaction”[23]. Because the visual contact plays a key role in interaction design, the user experience could be improved by aesthetically pleasing. As mentioned before, the main problem of Chris’s trajectories sketching tool is monotonous layout and interfaces. Therefore, we are going to embellish interfaces and layout of software.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.012.png)

`	                `Figure 20 Enhanced trajectories sketching tool

This is new layout of sketching page. Compare with previous version, the top file bar float to right. The consistency is one of the most powerful usability principles [24]. Either web design or software design, the layout should be always consistent. Therefore, the file bar, canvas, action bar and history pane all float to right. Furthermore, the width of action bar and selection history are same. In addition, people are used to reading from left to right, and the properties need to be edited after action buttons selected. Therefore, the properties pane was moved to right corner. It should be more convenient than previous design.

The logo has been placed on the top of software. It is obviously to show the name of this software. There are only three main colours of interfaces, which are grey, bright blue and white. They are browser safe colours which not distract users. In order to achieve compact design, it should not present too many colours on one page. Similarly, the text should not use multiple colours as well. It will show an unclear purpose to user. 

The icon has replaced all textual buttons as below. It is very popular in some professional drawing software, such as illustrator and Photoshop (Figure 22). The graphic element is livelier than textual, and user likes direct watch rather than reading. Furthermore, all icons should have consistent design and colour composition. In enhanced software, I made the flat design of icons. Because icon should be stylistically consistent, the colour, size and style all are same. Specifically, the design of icon should be easily understandable by users. According to the generic design of icons, the enhanced action buttons has been designed (Figure 21). In web usability, the button should also present whether active or not to users. Therefore, a grey boarder revolves around the icon when it is actived.

![](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.013.png)

`                            `Figure 21 Enhanced action buttons.

![C:\Users\Wenliang\Desktop\sad.png](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.014.png)



`                        `Figure 22 Example of icons in Photoshop CC
### <a name="_toc366063817"></a>**5.2.2 Functional improvement**
“The user experience is central to interaction design.”[6] Because of that, this design has been consider more with user needs.** Initial testing indicates problem with action buttons. Users do not understand the exact purpose of some buttons and what is going to do in next steps. They are used to previous experience of other sketching tools like Photoshop, Drawing board. Although we provide sketcher manual and demo to them, it is still hard to change their operational habit. Thus, hints are displayed when mouse stay on the action buttons. The hints will explain the detailed functionalities of these buttons.

![C:\Users\Wenliang\Desktop\111.png](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.015.png)

Figure 23 Hints of back button.

The initial testing also identified problems of perform text, frame, upload picture, and load. Thus, it will pop an alert-box when they first click the frame and choose file (load image) buttons. In particular, most users will drag the mouse directly after click the frame button, but they are not able to draw anything. In my design, when user select the frame button, the alert-box will tell them change style in properties pane or the frame can not be draw. Similar, the user would be lost when uploading image. It is better to tell them that use the copy button to insert picture. Because of same reason, the warning is displayed when loading file. They should be aware that need to choose file first then load it. Besides, the text button is little different with others. The alert-box will be displayed only when user does not key-in any texts yet.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.016.png)

Figure 24 Alert-box of text button.

![A screenshot of a computer error

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.017.png)

Figure 25 Alert-box of frame button.

![](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.018.png)

Figure 23 Alert-box for upload image locally.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.019.png)

`                     `Figure 23 Alert-box of load button.

The background of canvas has been redesigned due to drawing white colour can not be seen at original background. Besides, it is argued that the long scrolling pages are one of top mistakes in web design [25]. In original properties (Figure 24), the layout does not align with other panes, and user needs to scroll the web page then view rest of part. Thus, the drop-down menu is applied into new interface. It enable user hides the properties pane when they do not need it. By click the properties button, the window can be opened and closed.

![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.020.png) ![A screenshot of a computer

Description automatically generated](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.021.png)

Figure 24 Compare orignial version’s properties editor with new version’s.

At the chapter 2 it stated that the transitions are some particular moments of trajectory. It always is illustrated as a circle in sketch (Figure 4 and 5). Anyway, it is not easy to draw a circle in original software (Heuristic analysis- Flexibility and efficiency of use). In order to improve that, the circle tool is provided in enhanced version. In addition, the circle can be edited in properties. It can be changed like fill-in color, hollow (Figure 25). 

![](Aspose.Words.5d8711ea-78fd-496f-8458-94f445b20b43.022.png)

Figure 25 Three styles of circle was created by new software
## <a name="_toc366063818"></a>**5.3 Implementation and Coding**
In order to implement enhancements above, it is necessary to add some coding into original file. The development is based on Professor Greenhalgh Christopher’s documents (Appendix1). As mentioned before, it is mainly developed by JavaScript, HTML. The enhanced development was using the same technology.

The logo has been draw by Photoshop. Then it was inserted to web page by HTML code like <img src="background3.png" width="850" height="90” alt="Title"/>. Every pane is included by a div element, and each div have corresponding class in skecher2.css. For example, by using the CSS language, the background colour, font colour, font style and other elements of file bar is defined as below:

`   `div.headerItem {

`	`float: right;  /\* *the position of div float to right side* \*/

`	`background-color: #26a8ff;

`	`color: #FFF;  /\* font colour \*/

`	`border: 2px solid gray;

`	`font-family: Gotham, Arial, Helvetica, "Helvetica Neue", sans-serif; /\* Font style \*/

`	`Width: 80%; /\* div width \*/

Therefore, if we want to apply this attributes in any div, it can be called like this: <div class="headerItem">.  In order to alert the background of canvas, the fragment of code like below: 

`    `canvas.detailCanvas {

`	 `height: 500px;

`	 `width: 100%;

`	 `background-image: url(background1.jpg);  /\* link to local file \*/

The all icons have been made by Photoshop. The design refers to other good design examples. It has been inserted to each div. For example, the Back [backspace] using the code like this: <div class="action" id="backAction"><img src="Arrow back.jpg" width="31" height="31" title ="[Backspace] revert back to the previous sketch or index of sketches" /></div>. The title attribute provides hints function and width and height identify the consistent size of icons.

As mentioned above, there are two types of alert-box. One only needs to be displayed after first time of click and other one need to be showed as long as none text. Because of this, it has been implement as scripts below.

`      `// display alert at first time only

`      `function FrameCheck()

`    `{

`        `If (i==0)

`        `{

`            `alert("Please choose the frame style in properties!");

`        `}

`		`else{

`		     `return true;

`			 `}

`		`i+=1;

`	`}

// as long as none text

function TextCheck()

`    `{

`        `if(document.getElementById("orphanText").value=="")

// get the element form id orphanText, if value is none.

`        `{

`            `alert("Please enter the text in Properties!");

`            `return false;

`        `}

`	`}

The first function class need be mapped at <div class="action actionDisabled" id="addFrameAction" onclick="FrameCheck()">.  The event is mapped by onclick attribute. For second fragment, the value has been checked from coding <input id="orphanText" type="text" width="20"/>(text area). 

In order to execute the drop-down menu it is necessary to create the JavaScript file. It get element by id hide, which form the Properties image button: <input type ="image" src ="t1.png" width="100"height="30" id="hide";'>.Then, mapping the functions to <div id="box" class="properties">. This div includes the all properties buttons.

var tar,b;

var f = true; 

function dropdown(dropdown){

`  `var a = tar.offsetHeight;

` `a += dropdown\*5;

`  `if(a>=450){

`   `clearInterval(b);

`  `tar.style.height = "450px";

`     `f = true;

`  `}

`  `else if(a<=30){

`   `clearInterval(b);

`   `tar.style.height = "30px";

`   `f = true;

`  `} 

`  `else tar.style.height = a + "px";

` `}

function openclose(){

` `document.getElementById("hide").onclick = 

` `function(){

`   `clearInterval(b);

`   `if(tar.offsetHeight>=450)

`      `b=setInterval("dropdown(-1)",5);

`   `else

`      `b = setInterval("dropdown(1)" , 5); 

`  `}

}

window.onload = function()

{

` `tar = document.getElementById("box")

` `tar.style.height = "30px";

` `openclose();

}

Ultimately, in order to implement drawing circle the div id attribute was defined as “addCircleAction”. Then, configure paper-20130430.js as an API over HTML5 canvas. Paper.js [http://paperjs.org/] has been defined as “The Swiss Army Knife of Vector Graphics Scripting.” People call it like this, because it is good at drawing vector graphics in JavaScript. By using this technology, the circle is just a paper.js element and is quite straightforward to implement. 

As mentioned before, it also needs to do some configurations by MVC documents. Firstly, sketchbook.js configure prototype to addCircleAction. The drawing circle data support model has been identified in this file. It can manipulate the multiple functions like sketchId, centre, rad, strokewidth, frameStyle, lineColor, fillColor (change colour of circle, fill-in colour, etc.) 

Secondly, it needs to create a new tool class (CircleTool) and define the new actions (addCircleActions, getElementBounds, MoveTool) in sketchertools.js. In particular, the class ‘MoveTool’ is responsible for moving an item around the canvas. The element to be moved is the one that is currently selected. So, if users draw a circle, select it and then press the move button, they should be able to re-position the circle somewhere else on the canvas. When users move an object then they need to move a representation of it - this is the bounding box that defines the element and getElementBounds just works out how big the bounding box around these elements is. If users move a circle around the canvas they should see a red rectangle box around it. The code of circle function mainly comes from Dr. Tony Glover’s code (Appendix1)

Thirdly, in sketcher2.js, add the circle id (addCircleAction) enable to be edited in particular properties editor (lineColor, fillColor, frameStyle, lineWidth). So far, the circle colour, fill colour ,width and style can be changed in properties pane. Furthermore, the circle should have class 'actionSelected', and setting the keyboard shortcuts and enable class ‘addCircleAction’. The fragment of code can be viewed in Appendix1.

