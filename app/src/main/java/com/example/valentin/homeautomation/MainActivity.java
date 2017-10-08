package com.example.valentin.homeautomation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    public WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //create new webview
        webView = new WebView(this);
        //enable JavaScript
        webView.getSettings().setJavaScriptEnabled(true);
        //create connection to android client side
        webView.addJavascriptInterface(new JavaWebAdapter(this), "Android");
        //load html file
        webView.loadUrl("file:///android_asset/index.html");
        //add webview as main view in android app
        setContentView(webView);
    }

}
