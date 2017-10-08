package com.example.valentin.homeautomation;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * Created by valentin on 10/6/17.
 */

public final class TCPChannel extends Thread {
    private Socket socket;
    private final BlockingQueue<String> outputBufferQueue;
    protected PrintWriter writer;
    private BufferedReader reader;
    private MainActivity mainContext;
    private JavaWebAdapter webViewContext;

    public TCPChannel(MainActivity mainContext, JavaWebAdapter webViewCtx) {
        this.mainContext = mainContext;
        this.outputBufferQueue = new ArrayBlockingQueue<>(10);
        this.webViewContext = webViewCtx;
        super.start();
    }

    @Override
    public void run() {
        try {
            this.socket = new Socket(Constants.IP, Constants.PORT);
            toast("Connected to Server", 0);
            new MessageNotifierThread().start();
            this.writer = new PrintWriter(socket.getOutputStream());
            try {
                while (true) {
                    String msg = outputBufferQueue.take();
                    writer.write(msg);
                    writer.flush();
                }
            } catch (Exception e) {
                toast("Failed to write message", 0);
            } finally {
                writer.close();
            }
        } catch (Exception e) {
            toast("Could not create Socket or Streams",0);
        } finally {
            try {
                socket.close();
            } catch (Exception e) {
                toast("ERR 1", 0);
            }
        }
    }

    public void write(String msg) {
        outputBufferQueue.add(msg);
    }

    public void toast(final String msg, final int length){
        Handler handler = new Handler(Looper.getMainLooper());

        handler.post(new Runnable() {

            @Override
            public void run() {
                if(length ==0)
                    Toast.makeText(mainContext, msg, Toast.LENGTH_SHORT).show();
                else
                    Toast.makeText(mainContext, msg, Toast.LENGTH_LONG).show();
            }
        });
    }

    public void sendToClient(final String msg){
        Handler handler = new Handler(Looper.getMainLooper());

        handler.post(new Runnable() {

            @Override
            public void run() {
            webViewContext.sendToClient(msg);
            }
        });
    }

    private class MessageNotifierThread extends Thread {

        public MessageNotifierThread(){ }

        @Override
        public void run() {
            try {
                reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                while (true) {
                    String msg = reader.readLine();
                    sendToClient(msg);
                }
            } catch (Exception e) {
               toast("reading message from server went wrong", 1);
            } finally {
                try {
                    reader.close();
                } catch (Exception e) {
                    toast("ERR 2", 0);
                }
            }
        }
    }

    public boolean isConnectedToServer() {
        if (socket != null) {
            return socket.isConnected();
        }
        return false;
    }

}
