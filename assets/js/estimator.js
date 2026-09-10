/**
 * IDEAL KITCHENS ZAMBIA — INSTANT KITCHEN ESTIMATOR ENGINE
 * Architecture: Reactive Step Wizard / Configurable Zambian Kwacha (ZMW) Formulas / WhatsApp Bridge
 */

// ==========================================================================
// CONFIGURABLE PRICING BENCHMARKS (ZMW - ZAMBIAN KWACHA)
// Easily adjustable by Ideal Kitchens management or developer
// ==========================================================================
const ESTIMATOR_CONFIG = {
  // Base Cabinetry (per linear meter of upper & lower cabinetry combined)
  basePricePerMeter: 8500,

  // Ceiling height multiplier (applies if wall height > 2.6m requiring extended upper stacks)
  heightMultiplier: 1.18,

  // Layout complexity and corner carcass factors
  layoutMultipliers: {
    'straight': 1.0,
    'l-shape': 1.25,
    'u-shape': 1.55,
    'island': 1.45
  },

  // Cabinet substrate & finish multipliers
  materialMultipliers: {
    'melamine': 1.0,
    'mdf': 1.20,
    'high-gloss': 1.38,
    'super-matte': 1.48
  },

  // Countertop materials (ZMW per linear meter installed)
  worktopPricesPerMeter: {
    'laminate': 2200,
    'quartz': 4800,
    'granite': 4200,
    'porcelain': 6500
  },

  // Hardware mechanical packages (flat rate system per kitchen)
  hardwarePackages: {
    'standard': 3500,
    'blum': 8500,
    'handleless': 7500,
    'luxury': 11500
  },

  // Architectural additions (flat rate per feature in ZMW)
  additionPrices: {
    'pantry': 8500,
    'island-waterfall': 14000,
    'tall-unit': 7500,
    'drawers': 4800,
    'led': 3800
  },

  // Company WhatsApp Number (Director Choolwe Simuunza / Office)
  whatsAppPhone: '260967864650'
};

// Estimator State
const estimatorState = {
  currentStep: 1,
  totalSteps: 6,
  wall1: 4.0,
  wall2: 2.5,
  height: 2.4,
  layout: 'l-shape',
  layoutName: 'L-Shaped Corner',
  cabinetMaterial: 'high-gloss',
  materialName: 'High Gloss Acrylic (E-1 EU Core)',
  worktop: 'quartz',
  worktopName: 'Solid Engineered Quartz',
  hardware: 'blum',
  hardwareName: 'Blum Motion Concealed Soft-Close',
  additions: ['pantry', 'led'],
  additionNames: ['Pull-Out Pantry Larder Tower', 'Under-Cabinet Ambient LED Channels'],
  lastEstimate: null
};

document.addEventListener('DOMContentLoaded', () => {
  initEstimatorModal();
  initEstimatorInputs();
  initEstimatorNavigation();
});

/**
 * 1. Modal Trigger & Setup
 */
function initEstimatorModal() {
  const modal = document.getElementById('estimatorModal');
  const openBtns = document.querySelectorAll('.trigger-estimator-btn');
  const closeBtn = document.getElementById('estimatorCloseBtn');

  if (!modal) return;

  const openEstimator = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateStepUI();
  };

  const closeEstimator = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openEstimator));
  if (closeBtn) closeBtn.addEventListener('click', closeEstimator);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeEstimator();
    }
  });
}

/**
 * 2. Inputs & Card Selection Logic
 */
function initEstimatorInputs() {
  // Dimension Inputs
  const wall1Input = document.getElementById('estWall1');
  const wall2Input = document.getElementById('estWall2');
  const heightInput = document.getElementById('estHeight');

  if (wall1Input) {
    wall1Input.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) estimatorState.wall1 = val;
    });
  }

  if (wall2Input) {
    wall2Input.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      estimatorState.wall2 = !isNaN(val) && val > 0 ? val : 0;
    });
  }

  if (heightInput) {
    heightInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) estimatorState.height = val;
    });
  }

  // Radio Select Cards (Layout, Material, Worktop, Hardware)
  const radioCardGroups = ['layout', 'material', 'worktop', 'hardware'];
  radioCardGroups.forEach(groupName => {
    const cards = document.querySelectorAll(`.select-card[data-group="${groupName}"]`);
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        const val = card.getAttribute('data-value');
        const name = card.getAttribute('data-name');

        if (groupName === 'layout') {
          estimatorState.layout = val;
          estimatorState.layoutName = name;
          // Toggle Wall 2 input visibility if straight vs corner
          const wall2Card = document.getElementById('wall2CardWrap');
          if (wall2Card) {
            wall2Card.style.opacity = (val === 'straight') ? '0.35' : '1';
          }
        } else if (groupName === 'material') {
          estimatorState.cabinetMaterial = val;
          estimatorState.materialName = name;
        } else if (groupName === 'worktop') {
          estimatorState.worktop = val;
          estimatorState.worktopName = name;
        } else if (groupName === 'hardware') {
          estimatorState.hardware = val;
          estimatorState.hardwareName = name;
        }
      });
    });
  });

  // Checkbox Cards (Additions)
  const additionCards = document.querySelectorAll('.select-card[data-group="additions"]');
  additionCards.forEach(card => {
    card.addEventListener('click', () => {
      const val = card.getAttribute('data-value');
      const name = card.getAttribute('data-name');
      const index = estimatorState.additions.indexOf(val);

      if (index > -1) {
        estimatorState.additions.splice(index, 1);
        estimatorState.additionNames.splice(index, 1);
        card.classList.remove('is-checked');
      } else {
        estimatorState.additions.push(val);
        estimatorState.additionNames.push(name);
        card.classList.add('is-checked');
      }
    });
  });
}

/**
 * 3. Wizard Navigation & Step Transition
 */
function initEstimatorNavigation() {
  const prevBtn = document.getElementById('estPrevBtn');
  const nextBtn = document.getElementById('estNextBtn');
  const restartBtn = document.getElementById('estRestartBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (estimatorState.currentStep < estimatorState.totalSteps) {
        estimatorState.currentStep++;
        updateStepUI();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (estimatorState.currentStep > 1) {
        estimatorState.currentStep--;
        updateStepUI();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      estimatorState.currentStep = 1;
      updateStepUI();
    });
  }

  // Lead Capture Submission
  const leadForm = document.getElementById('siteVisitForm');
  if (leadForm) {
    leadForm.addEventListener('submit', handleLeadSubmission);
  }
}

/**
 * 4. Update Step UI & Trigger Calculation
 */
function updateStepUI() {
  const steps = document.querySelectorAll('.estimator-step');
  const progressFill = document.getElementById('estProgressFill');
  const stepIndicator = document.getElementById('estStepIndicator');
  const prevBtn = document.getElementById('estPrevBtn');
  const nextBtn = document.getElementById('estNextBtn');
  const footerControls = document.getElementById('estFooterControls');

  // Activate Step
  steps.forEach(s => {
    const stepNum = parseInt(s.getAttribute('data-step'), 10);
    if (stepNum === estimatorState.currentStep) {
      s.classList.add('is-active');
    } else {
      s.classList.remove('is-active');
    }
  });

  // Update Progress
  const progressPercent = (estimatorState.currentStep / estimatorState.totalSteps) * 100;
  if (progressFill) progressFill.style.width = `${progressPercent}%`;
  if (stepIndicator) {
    stepIndicator.textContent = `STEP 0${estimatorState.currentStep} / 06`;
  }

  // Controls Visibility
  if (prevBtn) {
    prevBtn.style.visibility = (estimatorState.currentStep === 1) ? 'hidden' : 'visible';
  }

  if (estimatorState.currentStep === 6) {
    if (footerControls) footerControls.style.display = 'none';
    renderFinalCalculation();
  } else {
    if (footerControls) footerControls.style.display = 'flex';
    if (nextBtn) {
      nextBtn.textContent = (estimatorState.currentStep === 5) ? 'GENERATE ESTIMATE →' : 'NEXT STEP →';
    }
  }

  // Scroll to top of modal
  const modal = document.getElementById('estimatorModal');
  if (modal) modal.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 5. Calculation Formula & Output Rendering
 */
function calculateKitchenEstimate() {
  const cfg = ESTIMATOR_CONFIG;
  const s = estimatorState;

  // 1. Effective linear meters
  let linearMeters = s.wall1;
  if (s.layout !== 'straight' && s.wall2 > 0) {
    linearMeters += s.wall2;
  }

  // Layout multiplier
  const layoutMult = cfg.layoutMultipliers[s.layout] || 1.0;

  // Height multiplier (if ceiling > 2.6m)
  const heightMult = (s.height > 2.6) ? cfg.heightMultiplier : 1.0;

  // Material multiplier
  const materialMult = cfg.materialMultipliers[s.cabinetMaterial] || 1.0;

  // Cabinetry base cost
  const cabinetryCost = Math.round(linearMeters * cfg.basePricePerMeter * layoutMult * heightMult * materialMult);

  // Countertop cost
  const worktopRate = cfg.worktopPricesPerMeter[s.worktop] || 3500;
  const worktopCost = Math.round(linearMeters * worktopRate);

  // Hardware cost
  const hardwareCost = cfg.hardwarePackages[s.hardware] || 5000;

  // Additions cost
  let additionsCost = 0;
  s.additions.forEach(addKey => {
    additionsCost += (cfg.additionPrices[addKey] || 0);
  });

  // Subtotal & Range
  const subtotal = cabinetryCost + worktopCost + hardwareCost + additionsCost;
  const rangeLow = Math.round((subtotal * 0.92) / 500) * 500;
  const rangeHigh = Math.round((subtotal * 1.12) / 500) * 500;

  const results = {
    linearMeters,
    cabinetryCost,
    worktopCost,
    hardwareCost,
    additionsCost,
    subtotal,
    rangeLow,
    rangeHigh
  };

  estimatorState.lastEstimate = results;
  return results;
}

/**
 * Format currency with commas: e.g. ZMW 85,000
 */
function formatZMW(num) {
  return 'ZMW ' + num.toLocaleString('en-US');
}

/**
 * 6. Render Final Calculation Screen & WhatsApp Link
 */
function renderFinalCalculation() {
  const res = calculateKitchenEstimate();

  const rangeEl = document.getElementById('calcRangeDisplay');
  const cabinetryEl = document.getElementById('calcCabinetryVal');
  const worktopEl = document.getElementById('calcWorktopVal');
  const hardwareEl = document.getElementById('calcHardwareVal');
  const additionsEl = document.getElementById('calcAdditionsVal');
  const subtotalEl = document.getElementById('calcTotalVal');
  const whatsappBtn = document.getElementById('calcWhatsAppBtn');

  if (rangeEl) rangeEl.textContent = `${formatZMW(res.rangeLow)} — ${formatZMW(res.rangeHigh)}`;
  if (cabinetryEl) cabinetryEl.textContent = formatZMW(res.cabinetryCost);
  if (worktopEl) worktopEl.textContent = formatZMW(res.worktopCost);
  if (hardwareEl) hardwareEl.textContent = formatZMW(res.hardwareCost);
  if (additionsEl) additionsEl.textContent = formatZMW(res.additionsCost);
  if (subtotalEl) subtotalEl.textContent = formatZMW(res.subtotal);

  // Generate WhatsApp Direct Deep Link
  const s = estimatorState;
  const additionsStr = s.additionNames.length > 0 ? s.additionNames.join(', ') : 'None selected';

  const waMessage = 
`*IDEAL KITCHENS ZAMBIA — PRELIMINARY ESTIMATE*
Hello Director Choolwe / Ideal Kitchens Team,
I generated a preliminary kitchen estimate on your website for my space in Lusaka:

• *Dimensions:* Wall 1: ${s.wall1}m, Wall 2: ${s.wall2}m, Height: ${s.height}m
• *Layout:* ${s.layoutName}
• *Cabinet Material:* ${s.materialName}
• *Countertop Surface:* ${s.worktopName}
• *Hardware:* ${s.hardwareName}
• *Selected Additions:* ${additionsStr}

• *Estimated Project Range:* ${formatZMW(res.rangeLow)} — ${formatZMW(res.rangeHigh)}
• *Estimated Median Total:* ${formatZMW(res.subtotal)}

I would like to schedule an on-site laser measurement visit and review your material samples.`;

  const waUrl = `https://wa.me/${ESTIMATOR_CONFIG.whatsAppPhone}?text=${encodeURIComponent(waMessage)}`;

  if (whatsappBtn) {
    whatsappBtn.href = waUrl;
  }
}

/**
 * 7. Lead Form Submission (Site Visit Request)
 */
function handleLeadSubmission(e) {
  e.preventDefault();

  const name = document.getElementById('leadName').value;
  const phone = document.getElementById('leadPhone').value;
  const location = document.getElementById('leadLocation').value;
  const notes = document.getElementById('leadNotes').value;
  const s = estimatorState;
  const res = s.lastEstimate;

  const leadMessage = 
`*SITE VISIT & MEASUREMENT REQUEST — IDEAL KITCHENS*
Hello Choolwe Simuunza / Ideal Kitchens,
I would like to request an on-site laser measurement visit:

• *Client Name:* ${name}
• *Phone:* ${phone}
• *Lusaka Area / Location:* ${location}
• *Project Notes:* ${notes || 'Ready for site survey'}

*Configured Kitchen Estimate:*
• Layout: ${s.layoutName} (${s.wall1}m x ${s.wall2}m)
• Finishes: ${s.materialName} + ${s.worktopName}
• Estimated Range: ${formatZMW(res.rangeLow)} — ${formatZMW(res.rangeHigh)}`;

  const waUrl = `https://wa.me/${ESTIMATOR_CONFIG.whatsAppPhone}?text=${encodeURIComponent(leadMessage)}`;

  const formWrap = document.getElementById('siteVisitForm');
  if (formWrap) {
    formWrap.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="width: 54px; height: 54px; background: #25D366; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.6rem;">✓</div>
        <h4 style="font-family: var(--font-display); font-size: 1.4rem; color: #fff; margin-bottom: 0.5rem;">Request Registered Successfully</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted-light); margin-bottom: 1.5rem;">
          Thank you, ${name}. Your site visit request for <strong>${location}</strong> has been logged. Forward your brief directly to Director Choolwe on WhatsApp for instant confirmation.
        </p>
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; gap: 0.75rem;">
          <svg class="whatsapp-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width: 20px; height: 20px;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.46a.75.75 0 0 0 .918.918l4.292-1.388A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm-4.99 7.02c.23-.52.48-.53.7-.54.18-.01.39-.01.59-.01.2 0 .53.08.81.42.28.34.96 1.05 1.17 1.28.21.23.35.31.24.54-.11.23-.17.37-.34.58-.17.21-.36.46-.51.62-.17.18-.35.37-.15.72.2.35.89 1.47 1.91 2.38 1.31 1.17 2.41 1.53 2.76 1.7.35.17.56.14.77-.1.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.96 2.38 1.13.35.17.58.26.67.4.09.14.09.82-.26 1.8-.35.98-1.22 1.48-1.74 1.54-.49.06-1.13.08-3.41-.82-2.73-1.08-4.49-3.83-4.63-4.02-.14-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.28.55-.35.74-.35Z" fill="currentColor"/>
          </svg>
          <span>FORWARD TO CHOOLWE ON WHATSAPP →</span>
        </a>
      </div>
    `;
  }
}
