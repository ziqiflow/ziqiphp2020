<?php


namespace App\Http\Controllers\Tool;






class Crypt3Des
{
    var $key;
    var $iv;
    function Crypt3Des($key, $iv=''){

        $newkey = $key.mb_substr($key,0,16);

        $this->key = $newkey;
        $this->iv = $iv;
    }
    function encrypt($input){

        $size = mcrypt_get_block_size(MCRYPT_3DES,MCRYPT_MODE_ECB);

        $input = $this->pkcs5_pad($input, $size);

        $key = str_pad(pack("H48", $this->key),24,'0');

        $td = mcrypt_module_open(MCRYPT_3DES, '', MCRYPT_MODE_ECB, '');
        if( $this->iv == '' )
        {
            $iv = @mcrypt_create_iv (mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        }
        else
        {
            $iv = $this->iv;
        }
        @mcrypt_generic_init($td, $key, $iv);
        $data = mcrypt_generic($td, $input);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        $data = strtoupper(bin2hex($data));
        return $data;
    }
    function decrypt($encrypted){

        $encrypted = pack("H*", $encrypted);

        $key = str_pad(pack("H48", $this->key),24,'0');

        $td = mcrypt_module_open(MCRYPT_3DES,'',MCRYPT_MODE_ECB,'');
        if( $this->iv == '' )
        {
            $iv = @mcrypt_create_iv (mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
        }
        else
        {
            $iv = $this->iv;
        }
        $ks = mcrypt_enc_get_key_size($td);
        @mcrypt_generic_init($td, $key, $iv);
        $decrypted = mdecrypt_generic($td, $encrypted);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);

        return $decrypted;
    }

    function pkcs5_pad ($text, $blocksize) {
        $pad = $blocksize - (strlen($text) % $blocksize);
        return $text . str_repeat(chr('0x20'), $pad);
    }

}