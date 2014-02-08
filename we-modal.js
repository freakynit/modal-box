var MODAL = function() {
	var defaults = {
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
	};

	/******************************/
	var modalHtml = '<div id="overlay"></div>';
	var modalContentHtml = '<div id="overlay-content"></div>';
	var modalContentTextHtml = '<div id="overlay-content-text"></div>';

	var updatedModalCss = defaults['modalCss'];
	var updatedModalContentCss = defaults['modalContentCss'];
	var updatedModalContentTextCss = defaults['modalContentTextCss'];
	var modalText = "";
	var modalContent = "";
	var hideAfterMs = 0, timeoutHandler = null;
	var $modal = null, $modalContent = null, $modalContentText = null; 
	var afterHide = null, beforeHide = null, afterShow = null, beforeShow = null;

	/******************************/
	/* START: Private methods */
	var createNewModal = function() {
		if(!$modal) {
			$modal = $($(modalHtml));

			if(!$modalContent)
				$modalContent = $($(modalContentHtml));
			
			if(!$modalContentText)
				$modalContentText = $($(modalContentTextHtml));
			
			updateModalEvents();
		}

		updateModal();
	};

	var updateModalEvents = function() {
		if($modal) {
			$modal.click(function(){
				//$(this).hide();
				removeExistingModal();
			});
		}
	};

	var updateModalCss = function() {
		if($modal) {
			$modal.css(updatedModalCss);
			$modal.append($modalContent);
		}
	};

	var updateModalContent = function() {
		if($modalContent) {
			$modalContent.css(updatedModalContentCss);
			$modalContent.append($modalContentText);
		}
	};

	var updateModalContentText = function() {
		if($modalContentText) {
			$modalContentText.css(updatedModalContentTextCss);
			$modalContentText.html(modalText);
		}
	};

	var updateModal = function() {
		if($modal) {
			updateModalContentText();
			updateModalContent();
			updateModalCss();
		}
	};

	var removeExistingModal = function() {
		var proceedToHide = true;

		if(beforeHide) {
			proceedToHide = beforeHide();
		}

		if(proceedToHide) {
			$('body').children('#overlay').remove();
			$modal = null;
			clearTimeout(timeoutHandler);
			timeoutHandler = null;

			if(afterHide) {
				afterHide();
			}
		}
	};

	var addNewModal = function() {
		var proceedToShow = true;

		if(beforeShow) {
			proceedToShow = beforeShow();
		}
		
		if(proceedToShow) {
			createNewModal();
			$('body').append($modal.get(0));

			if(afterShow) {
				afterShow();
			}

			if(hideAfterMs > 0) {
				timeoutHandler = setTimeout(function() {
					removeExistingModal();
				}, hideAfterMs);
			}
		}
	};
	/* END: Private methods */

	/* START: Public methods */
	var show = function(mModalText, mModalContent, options) {
		if(options) {
			updatedModalCss = $.extend(defaults['modalCss'], updatedModalCss, options['modalCss']);
			updatedModalContentCss = $.extend(defaults['modalContentCss'], updatedModalContentCss, options['modalContentCss']);
			updatedModalContentTextCss = $.extend(defaults['modalContentTextCss'], updatedModalContentTextCss, options['modalContentTextCss']);

			if(options['hideAfter']) {
				hideAfterMs = options['hideAfter'];
			}

			if(options['afterShow']) {
				afterShow = options['afterShow'];
			}

			if(options['beforeShow']) {
				beforeShow = options['beforeShow'];
			}

			if(options['afterHide']) {
				afterHide = options['afterHide'];
			}

			if(options['beforeHide']) {
				beforeHide = options['beforeHide'];
			}
		}

		if(mModalContent) {
			$modalContent = $($(mModalContent));
		}

		if(mModalText) {
			modalText = mModalText;
		}

		removeExistingModal();
		addNewModal();
	};

	var hide = function() {
		removeExistingModal();
	};

	var init = function(mOptions) {
		defaults = $.extend(defaults, mOptions);
	};

	var getOverlay = function() {
		return $modal;
	};

	var getOverlayContentElement = function() {
		return $modalContent;
	};

	var getOverlayContentTextElement = function() {
		return $modalContentText;
	};

	var cancelTimeout = function() {
		if(timeoutHandler) {
			cancelTimeout(timeoutHandler);
		}
	};
	/* END: Public methods */

	return {
		'init':init,
		'show':show,
		'hide':hide,
		'getOverlay':getOverlay,
		'getOverlayContentElement':getOverlayContentElement,
		'getOverlayContentTextElement':getOverlayContentTextElement,
		'cancelTimeout':cancelTimeout
	};
}();
