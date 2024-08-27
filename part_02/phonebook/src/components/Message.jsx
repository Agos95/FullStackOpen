const Message = ({ message }) => {
    // console.log("message", message)
    if (message === null) {
        return null
    }
    else {
        return (
            <div className={message.type}>
                {message.text}
            </div>
        )
    }
}

export default Message
