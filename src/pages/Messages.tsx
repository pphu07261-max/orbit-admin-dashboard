import { useState } from 'react'
import { Search, Send, Paperclip } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { useAppStore } from '../store/useAppStore'
const initialMessages = [
  { id: 1, name: 'Olivia Rhye', preview: 'Hi, I wanted to ask about my recent order...', time: '10:42 AM', initials: 'OR', text: 'Hi! I wanted to ask about my recent order. Could you help me check the delivery status?' },
  { id: 2, name: 'Phoenix Baker', preview: 'Thank you for the quick response!', time: 'Yesterday', initials: 'PB', text: 'Thank you for the quick response! I received my package today.' },
  { id: 3, name: 'Lana Steiner', preview: 'Is this item available in another color?', time: 'Yesterday', initials: 'LS', text: 'Is this item available in another color? I would love to see the beige option.' },
]
export function Messages() {
  const [messages, setMessages] = useState(initialMessages)
  const [active, setActive] = useState(1)
  const [reply, setReply] = useState('')
  const toast = useAppStore((state) => state.toast)
  const selected = messages.find((item) => item.id === active) ?? messages[0]
  const send = () => { if (!reply.trim()) return; setMessages((items) => items.map((item) => item.id === active ? { ...item, preview: reply, text: `${item.text}\n\nYou: ${reply}` } : item)); setReply(''); toast('Tin nhắn đã được gửi (mock).', 'success') }
  return <><PageHeader title="Messages" description="Keep in touch with your customers." /><section className="panel messages-panel"><aside className="conversation-list"><div className="conversation-search"><Search size={16} /><input placeholder="Search messages..." /></div>{messages.map((item) => <button key={item.id} className={`conversation-item ${active === item.id ? 'selected' : ''}`} onClick={() => setActive(item.id)}><span className="mini-avatar">{item.initials}</span><span className="conversation-meta"><b>{item.name}</b><small>{item.preview}</small></span><small>{item.time}</small></button>)}</aside><div className="chat-window"><div className="chat-head"><span className="mini-avatar">{selected.initials}</span><div><b>{selected.name}</b><small>Customer</small></div><span className="online-dot">Online</span></div><div className="chat-body"><div className="chat-date">TODAY</div><div className="message-bubble">{selected.text}</div></div><div className="chat-compose"><button className="icon-button" aria-label="Đính kèm (demo)" onClick={() => toast('Đính kèm tệp sẽ được bổ sung khi kết nối API.', 'info')}><Paperclip size={18} /></button><input value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') send() }} placeholder="Write a message..." /><button className="button button-primary" onClick={send} disabled={!reply.trim()}><Send size={16} /> Send</button></div></div></section></>
}
