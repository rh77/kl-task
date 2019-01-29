import React, { Component } from 'react';
import "./Welcome.scss";

class Welcome extends Component<any, { time: Date }> {
  private interval:any = null;

  constructor(props) {
    super(props);

    this.state = { 
      time: new Date() 
    };
  }

  public render(): JSX.Element {
    const now = this.state.time;

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const angleSecond = seconds * 6;
    const angleMinute = (minutes + seconds / 60) * 6;
    const angleHour = (hours + minutes / 60) * 30;

    return (
      <div className="welcome-container">
        <div className="welcome-text">
          Welcome to my React app!<br/><br/>Please, navigate to [Users] menu above to see users.
        </div>
        <div className="clock" style={{ display: "block" }}>
          <div className="clock__hour12"/>
          <div className="clock__hour3"/>
          <div className="clock__hour6"/>
          <div className="clock__hour9"/>
          <div className="clock__hour1"/>
          <div className="clock__hour2"/>
          <div className="clock__hour4"/>
          <div className="clock__hour5"/>
          <div className="clock__hour7"/>
          <div className="clock__hour8"/>
          <div className="clock__hour10"/>
          <div className="clock__hour11"/>
          <Arrow className="clock__arrow-hour" angle={angleHour}/>
          <Arrow className="clock__arrow-minute" angle={angleMinute}/>
          <Arrow className="clock__arrow-second" angle={angleSecond}/>
          <div className="clock__center-cap"/>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ 
        time: new Date() 
      });
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }
}

const Arrow = (props: { className: string, angle: number }): JSX.Element => {
  const arrowTransformation = `rotate(${props.angle}deg)`;
  const style = {
    MsTransform: arrowTransformation,
    WebkitTransform: arrowTransformation,
    transform: arrowTransformation
  };
  return <div className={props.className} style={style}/>;
};

export default Welcome;
