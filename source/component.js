var TestBox = React.createClass({
  render: function() {
    return (
      <div className="test-box">
        <h1>Test Box</h1>
      </div>
    )
  }
})

React.render(
  <TestBox />
  document.getElementById('main')
)
