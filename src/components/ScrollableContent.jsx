import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';

class ScrollableContent extends Component {
  constructor(props) {
    super(props);
    this.scrollEl = React.createRef();
    this.state = {
      isTop: true,
    }
  }

  componentDidMount() {
    // if(scroll)
  }

  componentDidUpdate(prevProps) {
    // scroll to top when video is updated
    if (prevProps.playerId !== this.props.playerId) {
      this.scrollEl.current.scrollTo({ behavior: 'smooth', top: 0 });
    }
    if (prevProps.activeSection !== this.props.activeSection) {
      this.scrollEl.current.scrollTo({ behavior: 'smooth', top: 0 });
    }
  }
  
  handleScroll(e) {
    if (this.scrollEl.current.scrollTop > 10) {
      this.setState({ isTop: false });
    } else {
      this.setState({ isTop: true });
    }
  }

  render() {
    const { isTop } = this.state;
    return (
      <div
        className={classNames('app__scrolling-content', {'app__scrolling-content--shadow': !isTop})}
        ref={this.scrollEl}
        onScroll={(e)=>this.handleScroll(e)}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerId: state.playerId,
  activeSection: state.activeSection,
});

export default connect(mapStateToProps)(ScrollableContent);