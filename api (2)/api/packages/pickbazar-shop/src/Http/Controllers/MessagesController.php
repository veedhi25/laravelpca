<?php
namespace PickBazar\Http\Controllers;

use PickBazar\Events\MessageSent;
use Illuminate\Http\Request;
use PickBazar\Database\Models\Message;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\User;

class MessagesController extends CoreController
{

public function sendMessage(Request $request)
{
    // return $request->sender_id;
    // Store the message in the database
    $message = Message::create([
        'sender_id' => $request->params['sender_id'],
        'receiver_id' => $request->params['receiver_id'],
        'chat_id' => $request->params['chat_id'],
        'content' => $request->params['content']
    ]);

    // Broadcast the event
    event(new MessageSent($message));

    Log::info('Message sent event fired for message ID: ' . $message->chat_id);

    return response()->json(['status' => 'Message sent']);
   }

   public function getChatIdBySenderReceiver($sender_id, $receiver_id)
   {
       // Find a message between sender and receiver
       $message = Message::where(function ($query) use ($sender_id, $receiver_id) {
           $query->where('sender_id', $sender_id)
               ->where('receiver_id', $receiver_id);
       })->orWhere(function ($query) use ($sender_id, $receiver_id) {
           $query->where('sender_id', $receiver_id)
               ->where('receiver_id', $sender_id);
       })->first();
   
       // If a message is found, return the chat_id, otherwise return null
       return $message ? $message->chat_id : null;
   }



   public function getChatId(Request $request)
    {
        $sender_id = $request->input('sender_id');
        $receiver_id = $request->input('receiver_id');
        
        // Pass the sender_id and receiver_id as arguments
        $chat_id = $this->getChatIdBySenderReceiver($sender_id, $receiver_id);
        
        return response()->json([
            'chat_id' => $chat_id,
        ]);
    }


    

    public function getMessages(Request $request)
    {
        $sender_id = $request->input('sender_id');
        $receiver_id = $request->input('receiver_id');
        
        $chat_id = $this->getChatIdBySenderReceiver($sender_id, $receiver_id);
        
        $messages = Message::where('chat_id', $chat_id)->get();
        
        $sender = User::find($sender_id);
        $receiver = User::find($receiver_id);
        
        if ($sender && $receiver) {
            $messages = $messages->map(function ($message) use ($sender, $receiver) {
                $message->sender_name = $sender->name;
                $message->receiver_name = $receiver->name;
                return $message;
            });
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        return response()->json([
            'messages' => $messages,
        ]);
    }
    

    

  



   

}
