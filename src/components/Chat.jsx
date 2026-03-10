// import React, { useState, useEffect, useRef } from "react";
// import { supabase } from "../lib/supabase";
// import { Send, ArrowLeft, Check, CheckCheck } from "lucide-react";
// import toast from "react-hot-toast";

// export default function Chat({ match, onBack }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     getCurrentUser();
//     loadMessages();
//     subscribeToMessages();

//     return () => {
//       supabase.channel("messages").unsubscribe();
//     };
//   }, [match.id]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getCurrentUser = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     setCurrentUser(user);
//   };

//   const loadMessages = async () => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .or(
//           `and(sender_id.eq.${user.id},receiver_id.eq.${match.id}),and(sender_id.eq.${match.id},receiver_id.eq.${user.id})`,
//         )
//         .order("created_at", { ascending: true });

//       if (error) throw error;
//       setMessages(data || []);

//       // Mark unread messages as read
//       await markMessagesAsRead(data || []);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//       toast.error("Failed to load messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markMessagesAsRead = async (messagesList) => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const unreadMessages = messagesList.filter(
//         (msg) => msg.receiver_id === user.id && !msg.read,
//       );

//       if (unreadMessages.length > 0) {
//         const { error } = await supabase
//           .from("messages")
//           .update({ read: true })
//           .in(
//             "id",
//             unreadMessages.map((m) => m.id),
//           );

//         if (error) throw error;
//       }
//     } catch (error) {
//       console.error("Error marking messages as read:", error);
//     }
//   };

//   const subscribeToMessages = () => {
//     const subscription = supabase
//       .channel("messages")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "messages",
//         },
//         (payload) => {
//           const newMsg = payload.new;

//           // Only add message if it's part of this conversation
//           if (
//             (newMsg.sender_id === match.id &&
//               newMsg.receiver_id === currentUser?.id) ||
//             (newMsg.sender_id === currentUser?.id &&
//               newMsg.receiver_id === match.id)
//           ) {
//             setMessages((prev) => [...prev, newMsg]);
//           }
//         },
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || sending) return;

//     setSending(true);
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const { error } = await supabase.from("messages").insert({
//         sender_id: user.id,
//         receiver_id: match.id,
//         content: newMessage.trim(),
//         read: false,
//       });

//       if (error) throw error;

//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message");
//     } finally {
//       setSending(false);
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   if (loading) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
//       {/* Chat Header */}
//       <div className="flex items-center p-4 border-b">
//         <button
//           onClick={onBack}
//           className="mr-3 p-2 hover:bg-gray-100 rounded-full transition"
//         >
//           <ArrowLeft className="w-5 h-5 text-gray-600" />
//         </button>
//         <div className="flex items-center">
//           <img
//             src={match.photos?.[0] || "https://via.placeholder.com/40"}
//             alt={match.username}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div className="ml-3">
//             <h3 className="font-semibold text-gray-800">
//               {match.username}, {match.age}
//             </h3>
//             <p className="text-xs text-green-500">Online</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-4"
//         style={{ maxHeight: "calc(100vh - 300px)" }}
//       >
//         {messages.map((message) => {
//           const isOwn = message.sender_id === currentUser?.id;

//           return (
//             <div
//               key={message.id}
//               className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
//             >
//               <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
//                 {!isOwn && (
//                   <img
//                     src={match.photos?.[0] || "https://via.placeholder.com/30"}
//                     alt={match.username}
//                     className="w-6 h-6 rounded-full float-left mr-2 mb-1"
//                   />
//                 )}
//                 <div
//                   className={`rounded-2xl px-4 py-2 ${
//                     isOwn
//                       ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//                 <div
//                   className={`flex items-center mt-1 text-xs text-gray-500 ${isOwn ? "justify-end" : "justify-start"}`}
//                 >
//                   <span>{formatTime(message.created_at)}</span>
//                   {isOwn && (
//                     <span className="ml-1">
//                       {message.read ? (
//                         <CheckCheck className="w-4 h-4 text-blue-500" />
//                       ) : (
//                         <Check className="w-4 h-4 text-gray-400" />
//                       )}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 border-t">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
//             disabled={sending}
//           />
//           <button
//             type="submit"
//             disabled={!newMessage.trim() || sending}
//             className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Send, ArrowLeft, Check, CheckCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function Chat({ match, onBack }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user && match) {
      loadMessages();
      subscribeToMessages();
    }

    return () => {
      supabase.channel("messages").unsubscribe();
    };
  }, [match, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${match.id}),and(sender_id.eq.${match.id},receiver_id.eq.${user.id})`,
        )
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      await markMessagesAsRead(data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markMessagesAsRead = async (messagesList) => {
    try {
      const unreadMessages = messagesList.filter(
        (msg) => msg.receiver_id === user.id && !msg.read,
      );

      if (unreadMessages.length > 0) {
        const { error } = await supabase
          .from("messages")
          .update({ read: true })
          .in(
            "id",
            unreadMessages.map((m) => m.id),
          );

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMsg = payload.new;

          if (
            (newMsg.sender_id === match.id && newMsg.receiver_id === user.id) ||
            (newMsg.sender_id === user.id && newMsg.receiver_id === match.id)
          ) {
            setMessages((prev) => [...prev, newMsg]);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: match.id,
        content: newMessage.trim(),
        read: false,
      });

      if (error) throw error;

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex items-center p-4 border-b">
        <button
          onClick={onBack}
          className="mr-3 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center">
          <img
            src={match.photos?.[0] || "https://via.placeholder.com/40"}
            alt={match.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">
              {match.username}, {match.age}
            </h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {messages.map((message) => {
          const isOwn = message.sender_id === user.id;

          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
                {!isOwn && (
                  <img
                    src={match.photos?.[0] || "https://via.placeholder.com/30"}
                    alt={match.username}
                    className="w-6 h-6 rounded-full float-left mr-2 mb-1"
                  />
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isOwn
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div
                  className={`flex items-center mt-1 text-xs text-gray-500 ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <span>{formatTime(message.created_at)}</span>
                  {isOwn && (
                    <span className="ml-1">
                      {message.read ? (
                        <CheckCheck className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Check className="w-4 h-4 text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
