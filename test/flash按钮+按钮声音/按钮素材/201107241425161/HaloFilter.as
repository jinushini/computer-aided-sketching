class HaloFilter extends flash.filters.GlowFilter
{
    var _size, _target, _inflate, _intID, blurX, blurY;
    function HaloFilter(target, color, size)
    {
        super(color, 1, size, size, 1, 1, false, false);
        _size = size;
        _target = target;
        _inflate = false;
    } // End of the function
    function shineTo(size, step, mustScintillate)
    {
        _size = size;
        clearInterval(_intID);
        if (!arguments.length)
        {
            this._remove();
        }
        else
        {
            _intID = setInterval(this, "_setBlurSlide", HaloFilter.INTERVAL, size, step, mustScintillate);
        } // end else if
    } // End of the function
    function scintillate(keepHalo)
    {
        clearInterval(_intID);
        if (keepHalo === null)
        {
            this._remove();
        }
        else if (keepHalo == true)
        {
            this._apply(_size);
        }
        else
        {
            _intID = setInterval(this, "_scintillement", HaloFilter.INTERVAL);
        } // end else if
    } // End of the function
    function _apply(blur)
    {
        blurX = blur;
        blurY = blur;
        _target.filters = blur == 0 ? (null) : ([this]);
    } // End of the function
    function _setBlurSlide(size, step, mustScintillate)
    {
        var _loc3 = (size - blurX) / step;
        var _loc2 = HaloFilter.TooSmall(_loc3);
        var _loc4 = _loc2 ? (size) : (blurX + _loc3);
        this._apply(_loc4);
        if (_loc2)
        {
            clearInterval(_intID);
            if (HaloFilter.TooSmall(size))
            {
                this._remove();
            } // end if
            if (mustScintillate)
            {
                this.scintillate();
            } // end if
        } // end if
    } // End of the function
    function _scintillement()
    {
        var _loc3 = Number(_inflate);
        var _loc2 = HaloFilter.SCINTILLATE_COEF[_loc3] * _size;
        _inflate = !_inflate;
        this._apply(_loc2);
    } // End of the function
    function _remove()
    {
        _target.filters = null;
    } // End of the function
    static function TooSmall(step)
    {
        return (Math.abs(step) < 1);
    } // End of the function
    static var INTERVAL = 40;
    static var SCINTILLATE_COEF = [8.500000E-001, 1.150000E+000];
} // End of Class
