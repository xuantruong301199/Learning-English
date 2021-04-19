const jwt               = require('./jwt.js');
let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
        
    } else {
        data.infoUser = undefined;
    }
    
    return res.render(view, data);
}

exports.renderToView = renderToView;