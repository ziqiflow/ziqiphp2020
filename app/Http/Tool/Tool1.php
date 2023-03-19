<?php
namespace App\Http\Tool;

class Tool1
{


    static function getplatform($str=null){
        if(empty($str)){
            $str=$_SERVER['HTTP_USER_AGENT'];
        }
     return  static::get_os($str).'_'.static::getBrowser($str);
    }


   static function getBrowser($HTTP_USER_AGENT){
        if (strpos($HTTP_USER_AGENT, 'Maxthon')) {
            $browser = 'Maxthon';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 12.0')) {
            $browser = 'IE12.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 11.0')) {
            $browser = 'IE11.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 10.0')) {
            $browser = 'IE10.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 9.0')) {
            $browser = 'IE9.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 8.0')) {
            $browser = 'IE8.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 7.0')) {
            $browser = 'IE7.0';
        } elseif(strpos($HTTP_USER_AGENT, 'MSIE 6.0')) {
            $browser = 'IE6.0';
        } elseif(strpos($HTTP_USER_AGENT, 'NetCaptor')) {
            $browser = 'NetCaptor';
        } elseif(strpos($HTTP_USER_AGENT, 'Netscape')) {
            $browser = 'Netscape';
        } elseif(strpos($HTTP_USER_AGENT, 'Lynx')) {
            $browser = 'Lynx';
        } elseif(strpos($HTTP_USER_AGENT, 'Opera')) {
            $browser = 'Opera';
        } elseif(strpos($HTTP_USER_AGENT, 'Chrome')) {
            $browser = 'Google';
        } elseif(strpos($HTTP_USER_AGENT, 'Firefox')) {
            $browser = 'Firefox';
        } elseif(strpos($HTTP_USER_AGENT, 'Safari')) {
            $browser = 'Safari';
        } elseif(strpos($HTTP_USER_AGENT, 'iphone') || strpos($HTTP_USER_AGENT, 'ipod')) {
            $browser = 'iphone';
        } elseif(strpos($HTTP_USER_AGENT, 'ipad')) {
            $browser = 'iphone';
        } elseif(strpos($HTTP_USER_AGENT, 'android')) {
            $browser = 'android';
        } else {
            $browser = 'other';
        }
        return $browser;
    }
   static function get_os($HTTP_USER_AGENT){
        $agent =strtolower($HTTP_USER_AGENT);
        //print_r($agent);

        $os = false;

        if (preg_match('/win/i', $agent) && strpos($agent, '95'))
        {
            $os = 'Windows 95';
        }
        else if (preg_match('/win 9x/i', $agent) && strpos($agent, '4.90'))
        {
            $os = 'Windows ME';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/98/i', $agent))
        {
            $os = 'Windows 98';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/nt 6.0/i', $agent))
        {
            $os = 'Windows Vista';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/nt 6.1/i', $agent))
        {
            $os = 'Windows 7';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/nt 6.2/i', $agent))
        {
            $os = 'Windows 8';
        }else if(preg_match('/win/i', $agent) && preg_match('/nt 10.0/i', $agent))
        {
            $os = 'Windows 10';
        }else if (preg_match('/win/i', $agent) && preg_match('/nt 5.1/i', $agent))
        {
            $os = 'Windows XP';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/nt 5/i', $agent))
        {
            $os = 'Windows 2000';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/nt/i', $agent))
        {
            $os = 'Windows NT';
        }
        else if (preg_match('/win/i', $agent) && preg_match('/32/i', $agent))
        {
            $os = 'Windows 32';
        }
        else if (preg_match('/android/i', $agent))
        {
            $os = 'android';
        }
        else if (preg_match('/ipad/i', $agent))
        {
            $os = 'ipad';
        }
        else if (preg_match('/iphone/i', $agent))
        {
            $os = 'iphone';
        }
        else if (preg_match('/wp8/i', $agent))
        {
            $os = 'wp8';
        }
        else if (preg_match('/linux/i', $agent))
        {
            $os = 'Linux';
        }
        else if (preg_match('/unix/i', $agent))
        {
            $os = 'Unix';
        }
        else if (preg_match('/sun/i', $agent) && preg_match('/os/i', $agent))
        {
            $os = 'SunOS';
        }
        else if (preg_match('/ibm/i', $agent) && preg_match('/os/i', $agent))
        {
            $os = 'IBM OS/2';
        }
        else if (preg_match('/mac/i', $agent))
        {
            $os = 'Macintosh';
        }

        else if (preg_match('/powerpc/i', $agent))
        {
            $os = 'PowerPC';
        }
        else if (preg_match('/aix/i', $agent))
        {
            $os = 'AIX';
        }
        else if (preg_match('/hpux/i', $agent))
        {
            $os = 'HPUX';
        }
        else if (preg_match('/netbsd/i', $agent))
        {
            $os = 'NetBSD';
        }
        else if (preg_match('/bsd/i', $agent))
        {
            $os = 'BSD';
        }
        else if (preg_match('/osf1/i', $agent))
        {
            $os = 'OSF1';
        }
        else if (preg_match('/irix/i', $agent))
        {
            $os = 'IRIX';
        }
        else if (preg_match('/freebsd/i', $agent))
        {
            $os = 'FreeBSD';
        }
        else if (preg_match('/teleport/i', $agent))
        {
            $os = 'teleport';
        }
        else if (preg_match('/flashget/i', $agent))
        {
            $os = 'flashget';
        }
        else if (preg_match('/webzip/i', $agent))
        {
            $os = 'webzip';
        }
        else if (preg_match('/offline/i', $agent))
        {
            $os = 'offline';
        }
        else
        {
            $os = 'unknow_os';
        }
        return $os;
    }


    static function isMobile(){
        $_SERVER['ALL_HTTP'] = isset($_SERVER['ALL_HTTP']) ? $_SERVER['ALL_HTTP'] : '';
        $mobile_browser = '0';
        if(preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|iphone|ipad|ipod|android|xoom)/i', strtolower($_SERVER['HTTP_USER_AGENT'])))
            $mobile_browser++;
        if((isset($_SERVER['HTTP_ACCEPT'])) and (strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml') !== false))
            $mobile_browser++;
        if(isset($_SERVER['HTTP_X_WAP_PROFILE']))
            $mobile_browser++;
        if(isset($_SERVER['HTTP_PROFILE']))
            $mobile_browser++;
        $mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'],0,4));
        $mobile_agents = array(
            'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
            'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
            'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
            'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
            'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
            'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
            'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
            'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
            'wapr','webc','winw','winw','xda','xda-'
        );
        if(in_array($mobile_ua, $mobile_agents))
            $mobile_browser++;
        if(strpos(strtolower($_SERVER['ALL_HTTP']), 'operamini') !== false)
            $mobile_browser++;
        // Pre-final check to reset everything if the user is on Windows
        if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows') !== false)
            $mobile_browser=0;
        // But WP7 is also Windows, with a slightly different characteristic
        if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows phone') !== false)
            $mobile_browser++;
        if($mobile_browser>0)
            return true;
        else
            return false;
    }

//    static function isMobile() {

//        if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
//            return true;
//        }

//        if (isset($_SERVER['HTTP_VIA'])) {

//            return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
//        }

//        if (isset($HTTP_USER_AGENT)) {
//            $clientkeywords = array('nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile','MicroMessenger');

//            if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($HTTP_USER_AGENT))) {
//                return true;
//            }
//        }

//        if (isset ($_SERVER['HTTP_ACCEPT'])) {


//            if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
//                return true;
//            }
//        }
//        return false;
//    }




}