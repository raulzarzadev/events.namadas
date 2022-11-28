const FAQs = () => {
  return (
    <div className="max-w-sm mx-auto">
      <Question
        title="Way events.nadamas.app?"
        text="events.nadamas.app is a platform where you can find all sport events and
        filter by location, sport or dates"
      />
      <Question
        title="Price?"
        text={`You always will bee free to add events by free. 

        If you want help whit payments and managing the subscription 
         `}
      />
      <Question
        title="Join to event?"
        text="You can find information about each event, there landing pages, social
        media and payments methods in there own details "
      />
      <Question
        title="whats next?"
        text={` Soon you will be able to create subscriptions section and control all related whit payments in one place. 
        
        Easy, fast and cheaper than if you do it manually.
        
        You always will bee free to add events by free. 
        `}
      />
    </div>
  )
}

const Question = ({ title, text }: { title: string; text: string }) => (
  <div tabIndex={0} className="collapse">
    <div className="collapse-title text-xl font-medium">{title}</div>
    <div className="collapse-content">
      <p className="whitespace-pre-line">{text}</p>
    </div>
  </div>
)

export default FAQs
