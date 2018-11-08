import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from 'features/home/home';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
  
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
