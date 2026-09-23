(() => {
  'use strict';
  // Review-only frontend. No payment SDK, form submission, personal-data storage,
  // or live-mode switch. Server-verified checkout must be integrated before launch.
  const plans = {
    'workshop-now': {group:'workshop', name:'Pay $97 now', title:'Real Estate Scaling Workshop', today:97, later:'No further workshop payment', label:'After today', note:'One payment. Workshop video, workbook, and lifetime access with purchase.', guarantee:'Proposed 48-hour next-move guarantee. Request a refund within the window if you still don’t know your next step.', consent:'I understand this option charges $97 once at checkout. I have reviewed the proposed 48-hour refund terms.'},
    'workshop-later': {group:'workshop', name:'Pay $297 after 48 hours', title:'Real Estate Scaling Workshop', today:0, later:'$297 once after 48 hours', label:'Scheduled charge', note:'Card required today. Cancel before the exact deadline and the $297 will not be charged. Lifetime access begins once paid.', guarantee:'The proposed 48-hour window starts when workshop access is delivered. The finished checkout must show your exact charge deadline.', consent:'I understand my card would be charged $297 automatically after 48 hours unless I cancel before the deadline. This is not a free signup.'},
    'vip-monthly': {group:'membership', name:'Monthly · $97/month', title:'Early Access Buyers', today:97, later:'$97 each month', label:'Automatic renewal', note:'Core member benefits. Cancel anytime to stop future renewals. The annual $699 purchase-credit benefit is not included.', guarantee:'Proposed cancellation keeps access through your paid month. Cancellation does not itself issue a refund.', consent:'I understand this is a $97 monthly subscription that renews until canceled, and I have reviewed the proposed cancellation terms.'},
    'vip-annual': {group:'membership', name:'Annual · $996/year', title:'Early Access Buyers', today:996, later:'$996 each year', label:'Automatic renewal', note:'Core member benefits plus the proposed $699 credit on each eligible purchase.', guarantee:'Proposed 30-day annual guarantee requires one live call and two recordings. The refund request timing still needs confirmation.', consent:'I understand this is a $996 annual subscription that renews until canceled. I have reviewed the participation-based guarantee and purchase-credit terms.'},
    'vip-workshop': {group:'offer', name:'Workshop offer · $699/year', title:'Early Access Buyers · Workshop offer', today:699, later:'$699 each year', label:'Proposed lifetime rate', note:'$996 standard annual price less a $297 discount each year. Workshop payment remains separate. Eligibility must be verified before checkout.', guarantee:'Proposed 30-day annual guarantee requires one live call and two recordings. Lifetime-rate and eligibility terms are still being finalized.', consent:'I understand this is a $699 annual subscription, separate from any workshop payment, with eligibility and final terms to be verified before payment.'}
  };
  const queryPlan = new URLSearchParams(location.search).get('plan');
  let selected = Object.hasOwn(plans, queryPlan) ? queryPlan : 'workshop-now';
  const group = plans[selected].group;
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const el = id => document.getElementById(id);
  el('plan-heading').textContent = group === 'workshop' ? 'Workshop options' : group === 'offer' ? 'Workshop attendee offer' : 'Membership options';
  const choices = Object.entries(plans).filter(([,plan]) => plan.group === group);
  for (const [id,plan] of choices) {
    const label=document.createElement('label'); label.className='choice';
    const input=document.createElement('input');input.type='radio';input.name='plan';input.value=id;input.checked=id===selected;
    const content=document.createElement('span');const name=document.createElement('strong');name.textContent=plan.name;
    const detail=document.createElement('span');detail.className='muted';detail.textContent=plan.note;
    content.append(name,detail);label.append(input,content);el('plan-choices').append(label);
    input.addEventListener('change',()=>{selected=id;render();history.replaceState(null,'',`?plan=${encodeURIComponent(id)}`);});
  }
  function render(){
    const p=plans[selected];el('order-kind').textContent=p.group==='workshop'?'Workshop':'Membership';
    el('order-title').textContent=p.title;el('due-today').textContent=money(p.today);
    el('later-label').textContent=p.label;el('later-amount').textContent=p.later;
    el('order-details').textContent=p.note;el('guarantee-copy').textContent=p.guarantee;
    el('consent-copy').textContent=p.consent;el('terms').checked=false;el('checkout-status').textContent='';
    const offer=p.group==='offer';el('eligibility-note').hidden=!offer;
    el('eligibility-note').textContent=offer?'Preview only. Opening this link does not establish eligibility or start a 24-hour timer. No attendee or deadline has been verified.':'';
    el('plan-context').textContent=p.group==='workshop'?'No membership is added to your workshop order. The buyers-list and paid-membership invitations come after the workshop.':'The workshop and membership are separate purchases. No property is reserved by joining.';
    el('back-link').href=p.group==='workshop'?'/scaling-workshop/#choose':offer?'/early-access/workshop-offer/':'/early-access/#membership';
    el('back-link').textContent=p.group==='workshop'?'Back to the workshop':'Back to the membership';
  }
  el('checkout-button').addEventListener('click',()=>{
    if(!el('terms').checked){el('checkout-status').textContent='Please review and check the payment terms above. This is a preview only.';el('terms').focus();return;}
    el('checkout-status').textContent='Enrollment is not open yet. No payment page has opened, no card details have been collected, and no order has been created. The workshop and final offer terms are being prepared.';
  });
  render();
})();
