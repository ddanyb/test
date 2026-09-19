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
      .catch(function () {
        status.textContent = 'Something went wrong sending your request. Please call (314) 607-1022 or email us directly.';
        status.className = 'form-status error';
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Quote Request';
      });
  });

  /* No backend is wired up yet, so we open a pre-filled email as the delivery
     mechanism. Swap this for a fetch() call once a form endpoint exists. */
  function submitQuoteRequest(data) {
    return new Promise(function (resolve) {
      var subject = 'Quote Request — ' + data.serviceNeeded + ' (' + data.fullName + ')';
      var bodyLines = [
        'Name: ' + data.fullName,
        'Phone: ' + data.phone,
        'Email: ' + data.email,
        'Property Type: ' + data.propertyType,
        'Service Needed: ' + data.serviceNeeded,
        'Project Address / City: ' + data.address,
        'Timeline: ' + (data.timeline || 'Not specified'),
        '',
        'Description:',
        data.description || '(none provided)'
      ];
      var mailto = 'mailto:dannybacon@abatementsolutionsllc.net'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
      resolve();
    });
  }
})();
