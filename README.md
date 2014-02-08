modal-box
=========

simple modal-box

Basic Usage:
------------
MODAL.init();

MODAL.show("Saving...");


Options available:
------------------
MODAL.init(
  {
    'modalCss': {
			'background-color': 'rgba(0, 0, 0, 0.8)',
		    'z-index': 999999,
		    'position': 'absolute',
		    'left': 0,
		    'top': 0,
		    'width': '100%',
		    'height': '100%',
		    'display': 'block',
		    'text-align':'center',
		    'padding-top':'150px'
		},
		'modalContentCss':{
			'text-align':'center'
		},
		'modalContentTextCss':{
			'color':'white'
		}
  }
);
