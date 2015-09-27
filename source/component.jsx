var TestBox = React.createClass({
  render: function() {
    return (
      <div className="test-box">
        <h1>Test Box {this.props.name}</h1>
      </div>
    )
  }
})

React.render(
  <TestBox name="Anna" />
  document.getElementById('main')
)
