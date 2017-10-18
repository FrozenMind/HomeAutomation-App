package com.example.valentin.homeautomation;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

/**
 * Created by valentin on 10/6/17.
 */

public class JavaWebAdapter {
    public MainActivity ctx;
    TCPChannel tcpChannel;

    /** Instantiate the interface and set the context */
    JavaWebAdapter(MainActivity c) {
        this.ctx = c;
        this.tcpChannel = new TCPChannel(this.ctx, this);
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String msg, int length) {
        if(length == 0) //short toast
            Toast.makeText(ctx, msg, Toast.LENGTH_SHORT).show();
        else //long toast
            Toast.makeText(ctx, msg, Toast.LENGTH_LONG).show();
    }

    @JavascriptInterface
    public void sendToServer(String msg){
        tcpChannel.write(msg);
    }

    @JavascriptInterface
    public void sendToClient(String msg){
        ctx.webView.loadUrl("javascript:receiveFromServer('" + msg + "')");
    }

    @JavascriptInterface
    public void useID(int id){
        Constants.ID = id;
    }
}
