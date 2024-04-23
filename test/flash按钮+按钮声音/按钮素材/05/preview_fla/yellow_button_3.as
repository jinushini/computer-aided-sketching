package preview_fla
{
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;

    dynamic public class yellow_button_3 extends MovieClip
    {
        public var url:String;
        public var buttonState:String;

        public function yellow_button_3()
        {
            addFrameScript(0, frame1, 8, frame9, 20, frame21, 29, frame30);
            return;
        }// end function

        public function reversePosition(param1:Event)
        {
            if (buttonState == "mousein")
            {
                if (currentLabel != "hover")
                {
                    gotoAndStop(currentFrame--);
                }
                else
                {
                    removeEventListener(Event.ENTER_FRAME, reversePosition);
                }// end else if
            }
            else
            {
                removeEventListener(Event.ENTER_FRAME, reversePosition);
            }// end else if
            return;
        }// end function

        public function hover(param1:MouseEvent)
        {
            buttonState = "mousein";
            if (hasEventListener(Event.ENTER_FRAME))
            {
                removeEventListener(Event.ENTER_FRAME, reverseLight);
            }// end if
            gotoAndPlay("hover");
            return;
        }// end function

        public function onrelease(param1:Event)
        {
            var _loc_2:URLRequest;
            addEventListener(Event.ENTER_FRAME, reversePosition);
            if (url != null)
            {
                _loc_2 = new URLRequest(url);
                navigateToURL(_loc_2);
            }// end if
            return;
        }// end function

        public function reverseLight(param1:Event)
        {
            buttonState = "mouseout";
            if (currentLabel != "noaction")
            {
                gotoAndStop(currentFrame--);
            }
            else
            {
                removeEventListener(Event.ENTER_FRAME, reverseLight);
            }// end else if
            return;
        }// end function

        function frame1()
        {
            buttonState = "mouseout";
            buttonMode = true;
            addEventListener(MouseEvent.ROLL_OVER, hover);
            addEventListener(MouseEvent.ROLL_OUT, mouseout);
            addEventListener(MouseEvent.MOUSE_UP, onrelease);
            addEventListener(MouseEvent.MOUSE_DOWN, onpress);
            return;
        }// end function

        function frame9()
        {
            stop();
            return;
        }// end function

        function frame21()
        {
            stop();
            return;
        }// end function

        function frame30()
        {
            stop();
            return;
        }// end function

        public function mouseout(param1:MouseEvent)
        {
            addEventListener(Event.ENTER_FRAME, reverseLight);
            return;
        }// end function

        public function setUrl(param1:String) : void
        {
            url = param1;
            return;
        }// end function

        public function onpress(param1:MouseEvent)
        {
            gotoAndPlay("active");
            return;
        }// end function

    }
}
