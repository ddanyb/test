(function () {
  'use strict';

  /* Mobile nav toggle */
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a.btn, .main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Quote form validation + submission */
  var form = document.getElementById('quote-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');

  var validators = {
    'full-name': function (v) { return v.trim().length > 0 || 'Please enter your name.'; },
    phone: function (v) {
      var digits = v.replace(/\D/g, '');
      return digits.length >= 10 || 'Please enter a valid phone number.';
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.';
    },
    'property-type': function (v) { return v.trim().length > 0 || 'Please select a property type.'; },
    'service-needed': function (v) { return v.trim().length > 0 || 'Please select a service.'; },
    address: function (v) { return v.trim().length > 0 || 'Please enter the project address or city.'; }
  };

  function fieldWrap(id) {
    return document.getElementById(id).closest('.form-field');
  }

  function setError(id, message) {
    var wrap = fieldWrap(id);
    var errEl = document.getElementById('err-' + id);
    if (message) {
      if (wrap) wrap.classList.add('has-error');
      if (errEl) errEl.textContent = message;
    } else {
      if (wrap) wrap.classList.remove('has-error');
      if (errEl) errEl.textContent = '';
    }
  }

  function validateField(id) {
    var el = document.getElementById(id);
    var check = validators[id];
    if (!check) return true;
    var result = check(el.value);
    if (result === true) {
      setError(id, null);
      return true;
    }
    setError(id, result);
    return false;
  }

  Object.keys(validators).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function () { validateField(id); });
    el.addEventListener('input', function () {
      if (fieldWrap(id) && fieldWrap(id).classList.contains('has-error')) validateField(id);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = Object.keys(validators).reduce(function (ok, id) {
      var fieldOk = validateField(id);
      return ok && fieldOk;
    }, true);

    if (!valid) {
      status.textContent = 'Please fix the highlighted fields above.';
      status.className = 'form-status error';
      var firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    var data = {
      fullName: document.getElementById('full-name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      propertyType: document.getElementById('property-type').value,
      serviceNeeded: document.getElementById('service-needed').value,
      address: document.getElementById('address').value.trim(),
      timeline: document.getElementById('timeline').value,
      description: document.getElementById('description').value.trim()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    submitQuoteRequest(data)
      .then(function () {
        status.textContent = "Thanks — your request is in. We'll be in touch shortly to confirm details.";
        status.className = 'form-status success';
        form.reset();
      })
      .catch(function (err) {
        console.error('Quote form submission failed:', err);
        if (window.location.protocol === 'file:') {
          status.textContent = 'This form only sends email when the site is viewed through a real web address (not opened directly as a file). Please email us directly at dannybacon@abatementsolutionsllc.net for now.';
        } else {
          status.textContent = 'Something went wrong sending your request. Please email us directly at dannybacon@abatementsolutionsllc.net.';
        }
        status.className = 'form-status error';
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Quote Request';
      });
  });

  var FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/dannybacon@abatementsolutionsllc.net';

  /* Sends the form to the business inbox via FormSubmit.co without leaving the page. */
  function submitQuoteRequest(data) {
    var payload = {
      _subject: 'Quote Request — ' + data.serviceNeeded + ' (' + data.fullName + ')',
      _template: 'table',
      _captcha: 'false',
      Name: data.fullName,
      Phone: data.phone,
      Email: data.email,
      'Property Type': data.propertyType,
      'Service Needed': data.serviceNeeded,
      'Project Address or City': data.address,
      Timeline: data.timeline || 'Not specified',
      Description: data.description || '(none provided)'
    };

    return fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Submission failed');
        return response.json();
      })
      .then(function (result) {
        if (result && (result.success === false || result.success === 'false')) {
          throw new Error(result.message || 'Submission failed');
        }
      });
  }
})();
