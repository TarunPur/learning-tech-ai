from __future__ import annotations

import html
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from pathlib import Path

SOURCE = Path('/Users/tarunpuri/Desktop/Learning Tech AI/AI & Tech for next gen professionals (Responses) (1).xlsx')
OUTPUT = Path('/Users/tarunpuri/Desktop/Learning Tech AI/AI_Learning_Research_Dashboard.html')
NS = {'x': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}


def column_index(reference: str) -> int:
    value = 0
    for letter in re.match(r'[A-Z]+', reference).group():
        value = value * 26 + ord(letter) - 64
    return value - 1


def read_xlsx(path: Path):
    with zipfile.ZipFile(path) as book:
        strings = []
        root = ET.fromstring(book.read('xl/sharedStrings.xml'))
        for item in root.findall('x:si', NS):
            strings.append(''.join(node.text or '' for node in item.iterfind('.//x:t', NS)))
        root = ET.fromstring(book.read('xl/worksheets/sheet1.xml'))
        rows = []
        for row in root.findall('.//x:sheetData/x:row', NS):
            cells = [''] * 19
            for cell in row.findall('x:c', NS):
                value = cell.find('x:v', NS)
                if value is None:
                    continue
                cells[column_index(cell.get('r'))] = strings[int(value.text)] if cell.get('t') == 's' else value.text
            rows.append(cells)
    headers = rows[0]
    return [dict(zip(headers, row)) for row in rows[1:] if any(row)]


def count_contains(rows, field, labels):
    return {label: sum(label.lower() in row[field].lower() for row in rows) for label in labels}


def add_write_ins(rows, field, labels):
    """Append a residual bucket without splitting response strings on commas."""
    counts = count_contains(rows, field, labels)
    residual = 0
    for row in rows:
        text = row[field].strip()
        if not text:
            continue
        for label in sorted(labels, key=len, reverse=True):
            text = text.replace(label, '')
        text = re.sub(r'(^|,)\s*(,|$)', ' ', text).strip(' ,')
        if text:
            residual += 1
    if residual:
        counts['Other / write-in'] = residual
    return counts


def segment(role: str) -> str:
    clean = role.strip().lower()
    if clean == 'product / management / design' or clean == 'project management': return 'Product / management / design'
    if clean == 'operations': return 'Operations'
    if clean == 'marketing / sales': return 'Marketing / sales'
    if clean == 'founder / entrepreneur / business owner': return 'Founder / business owner'
    if clean in {'finance', 'lead internal auditor', 'investment compliance', 'semi qualified ca'}: return 'Finance / audit / compliance'
    if clean == 'hr': return 'HR'
    if clean in {'student', 'studying', 'unemployed student'}: return 'Student / learner'
    technical = ('developer', 'engineer', 'sde', 'ai trainer', 'data analyst', 'erp', 'dev', 'engineering', 'software tester', 'quality engineer', 'it')
    if any(item in clean for item in technical): return 'Technical / development / data'
    return 'Other roles'


rows = read_xlsx(SOURCE)
ROLE = 'What is your current role or job title?'
FREQUENCY = 'How often do you use AI?'
CONFIDENCE = 'How confident are you in using technology and AI independently for your work?'
LEARNER = 'Do you regularly learn about AI? '
EXPERIENCE = 'Years of professional experience'
EDUCATION = 'Do you have any formal education in technology (e.g. BTech, BCA, MCA)'
PAYMENT = 'If something could actually help you get better at AI, would you pay for it?'
TOOLS = 'Which AI tools do you currently use?'
USES = 'What do you use AI tools for?'
BLOCKERS = 'What stops you from learning?'
FUN = 'If learning Tech & AI could be a little more fun, what would you pick?'
SOURCE_LEARN = 'Where do you usually go to learn about AI?'
GENDER = 'How do you identify yourself?'
AGE = 'What is your age group?'
PREFERENCE = 'What do you prefer when you are learning a new skill, topic, etc?'
FORMAT = 'How do you prefer to learn about AI and technology?'
MOTIVE = 'What is your main reason for wanting to learn AI?'
BLOCKER_OPTIONS = ['I don’t know where to start / what to learn next', 'I don’t get enough practice', 'Courses/Tools are expensive', 'Content is too theoretical', 'I get stuck when something doesn’t work', 'I lose motivation', 'Concepts are difficult to understand', 'I can’t apply it to my actual work', 'I understand tutorials but can’t do it myself']
MOTIVE_OPTIONS = ['Career Growth', 'Learning', 'Current job requirements', 'Building your own products', 'Job Security', 'Fear Of Missing Out (aka FOMO)']
PREFERENCE_OPTIONS = ['Understand the concept', 'Practice on real-world problems/projects']
FORMAT_OPTIONS = ['Short daily lessons (5-10 minutes)', 'Read about it / Figure it out myself', 'Long form videos (1-2 hours)', 'Weekend courses', 'Offline courses']

for row in rows:
    row['Segment'] = segment(row[ROLE])
    row['Cohort'] = 'Builder roles' if row['Segment'] in {'Product / management / design', 'Technical / development / data'} else 'All other roles'

segments = {}
for name in ['Product / management / design', 'Technical / development / data', 'Operations', 'Marketing / sales', 'Founder / business owner', 'Finance / audit / compliance', 'HR', 'Student / learner', 'Other roles']:
    group = [r for r in rows if r['Segment'] == name]
    if not group: continue
    segments[name] = {
        'n': len(group),
        'daily': sum(r[FREQUENCY] == 'Every single day' for r in group),
        'confidence': round(sum(float(r[CONFIDENCE]) for r in group) / len(group), 2),
        'learning': sum(r[LEARNER] == 'Yes' for r in group),
        'build': sum('building products' in r[USES].lower() for r in group),
    }

confidence = Counter(r[CONFIDENCE].replace('.0','') for r in rows)
frequency = Counter(r[FREQUENCY] for r in rows)
payment = Counter(r[PAYMENT] for r in rows)
TOOL_OPTIONS = ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Cursor']
USE_OPTIONS = ['Generate answers/summarisations (including email, content, etc.)', 'Drafting reports, SOPs, or other documents', 'Data Analysis', 'Image Generation', 'Building Products', 'Purchase/Gifting Suggestions', 'Travel Planning']
FUN_OPTIONS = ['Learn by solving real-life challenges', 'Small goals that keep me going', 'Learn with friends or a community', 'A guide who helps when I’m stuck', 'Games, levels or challenges']
SOURCE_OPTIONS = ['YouTube', 'Online Courses', 'LinkedIn', 'Blogs']
tools = add_write_ins(rows, TOOLS, TOOL_OPTIONS)
uses = add_write_ins(rows, USES, USE_OPTIONS)
blockers = add_write_ins(rows, BLOCKERS, BLOCKER_OPTIONS)
fun = add_write_ins(rows, FUN, FUN_OPTIONS)
learning_sources = add_write_ins([r for r in rows if r[LEARNER] == 'Yes'], SOURCE_LEARN, SOURCE_OPTIONS)
motives = add_write_ins(rows, MOTIVE, MOTIVE_OPTIONS)
preferences = count_contains(rows, PREFERENCE, PREFERENCE_OPTIONS)
formats = count_contains(rows, FORMAT, FORMAT_OPTIONS)

def profile(group):
    """Comparable, anonymised patterns for a demographic or role cohort."""
    return {
        'n': len(group), 'daily': sum(r[FREQUENCY] == 'Every single day' for r in group),
        'frequency': dict(Counter(r[FREQUENCY] for r in group)),
        'experience': dict(Counter(r[EXPERIENCE] for r in group)),
        'formalEducation': sum(r[EDUCATION] == 'Yes' for r in group),
        'confidence': round(sum(float(r[CONFIDENCE]) for r in group) / len(group), 2),
        'highConfidence': sum(float(r[CONFIDENCE]) >= 4 for r in group),
        'learners': sum(r[LEARNER] == 'Yes' for r in group),
        'payOpen': sum(r[PAYMENT] != 'No, I wouldn’t pay for it' for r in group),
        'tools': add_write_ins(group, TOOLS, TOOL_OPTIONS),
        'uses': add_write_ins(group, USES, USE_OPTIONS),
        'blockers': add_write_ins(group, BLOCKERS, BLOCKER_OPTIONS),
        'fun': add_write_ins(group, FUN, FUN_OPTIONS),
        'motives': add_write_ins(group, MOTIVE, MOTIVE_OPTIONS),
        'preferences': count_contains(group, PREFERENCE, PREFERENCE_OPTIONS),
        'formats': count_contains(group, FORMAT, FORMAT_OPTIONS),
        'sources': add_write_ins([r for r in group if r[LEARNER] == 'Yes'], SOURCE_LEARN, SOURCE_OPTIONS),
        'payment': dict(Counter(r[PAYMENT] for r in group)),
    }

cohorts = {name: profile([r for r in rows if r['Cohort'] == name]) for name in ['Builder roles', 'All other roles']}
gender_profiles = {name: profile([r for r in rows if r[GENDER] == name]) for name in ['Male', 'Female', 'Prefer not to say']}
age_order = ['18 - 25 year', '26 - 35 year', '36 - 50 year', 'Above 50']
age_profiles = {name: profile([r for r in rows if r[AGE] == name]) for name in age_order if any(r[AGE] == name for r in rows)}

def leading_option(group, field, options):
    counts = count_contains(group, field, options)
    option, count = max(counts.items(), key=lambda item: item[1])
    return (option, count) if count else ('No stated response', 0)

demographic_snapshots = []
for gender in ['Male', 'Female']:
    for age in age_order:
        group = [r for r in rows if r[GENDER] == gender and r[AGE] == age]
        if not group:
            continue
        use, use_count = leading_option(group, USES, USE_OPTIONS)
        motive, motive_count = leading_option(group, MOTIVE, MOTIVE_OPTIONS)
        blocker, blocker_count = leading_option(group, BLOCKERS, BLOCKER_OPTIONS)
        payment_label, payment_count = max(Counter(r[PAYMENT] for r in group).items(), key=lambda item: item[1])
        demographic_snapshots.append({
            'cohort': f'{gender} · {age}', 'n': len(group),
            'builderCount': sum(r['Cohort'] == 'Builder roles' for r in group),
            'use': use, 'useCount': use_count,
            'motive': motive, 'motiveCount': motive_count,
            'blocker': blocker, 'blockerCount': blocker_count,
            'payment': payment_label, 'paymentCount': payment_count,
            'payOpenCount': sum(r[PAYMENT] != 'No, I wouldn’t pay for it' for r in group),
        })
demographic_snapshots.sort(key=lambda item: item['n'], reverse=True)

def top_named(values):
    named = {key: value for key, value in values.items() if key != 'Other / write-in'}
    return max(named.items(), key=lambda item: item[1]) if named else ('No stated response', 0)

def executive_group(name, values):
    blocker, blocker_count = top_named(values['blockers'])
    motive, motive_count = top_named(values['motives'])
    payment, payment_count = max(values['payment'].items(), key=lambda item: item[1])
    return {
        'name': name, 'n': values['n'], 'daily': values['daily'], 'learners': values['learners'],
        'blocker': blocker, 'blockerCount': blocker_count,
        'motive': motive, 'motiveCount': motive_count, 'motiveBase': values['learners'],
        'payOpen': values['payOpen'], 'payment': payment, 'paymentCount': payment_count,
    }

role_executive = [executive_group(name, cohorts[name]) for name in ['Builder roles', 'All other roles']]
gender_executive = [executive_group(name, gender_profiles[name]) for name in ['Male', 'Female', 'Prefer not to say']]
age_executive = [executive_group(name, age_profiles[name]) for name in age_order if name in age_profiles]

overall_blocker_rates = {label: blockers[label] / len(rows) for label in BLOCKER_OPTIONS}
barrier_contrasts = []
for dimension, groups in [('Role segment', role_executive), ('Gender', gender_executive), ('Age group', age_executive)]:
    for group in groups:
        if group['n'] < 10:
            continue
        source = cohorts.get(group['name']) or gender_profiles.get(group['name']) or age_profiles.get(group['name'])
        for blocker in BLOCKER_OPTIONS:
            rate = source['blockers'][blocker] / group['n']
            delta = rate - overall_blocker_rates[blocker]
            if abs(delta) >= .10:
                barrier_contrasts.append({'dimension': dimension, 'group': group['name'], 'n': group['n'], 'blocker': blocker, 'count': source['blockers'][blocker], 'rate': rate, 'delta': delta})
barrier_contrasts.sort(key=lambda item: abs(item['delta']), reverse=True)

payment_contrasts = []
overall_pay_open = sum(r[PAYMENT] != 'No, I wouldn’t pay for it' for r in rows) / len(rows)
for dimension, groups in [('Role segment', role_executive), ('Gender', gender_executive), ('Age group', age_executive)]:
    for group in groups:
        if group['n'] < 10:
            continue
        rate = group['payOpen'] / group['n']
        if abs(rate - overall_pay_open) >= .10:
            payment_contrasts.append({'dimension': dimension, 'group': group['name'], 'n': group['n'], 'count': group['payOpen'], 'rate': rate, 'delta': rate - overall_pay_open})
payment_contrasts.sort(key=lambda item: abs(item['delta']), reverse=True)

data = {
    'n': len(rows), 'daily': frequency['Every single day'], 'learners': sum(r[LEARNER] == 'Yes' for r in rows),
    'avgConfidence': round(sum(float(r[CONFIDENCE]) for r in rows) / len(rows), 2),
    'confidence': dict(sorted(confidence.items())), 'frequency': dict(frequency), 'payment': dict(payment),
    'tools': tools, 'uses': uses, 'blockers': blockers, 'fun': fun, 'sources': learning_sources, 'motives': motives, 'preferences': preferences, 'formats': formats, 'segments': segments,
    'cohorts': cohorts, 'gender': gender_profiles, 'age': age_profiles, 'demographicSnapshots': demographic_snapshots,
    'roleExecutive': role_executive, 'genderExecutive': gender_executive, 'ageExecutive': age_executive,
    'barrierContrasts': barrier_contrasts[:8], 'paymentContrasts': payment_contrasts[:8], 'overallPayOpen': overall_pay_open
}
data['executiveInsights'] = sorted([
    {'count': sum(float(r[CONFIDENCE]) >= 3 for r in rows), 'base': 160, 'statement': 'rated their independent AI and technology confidence at 3/5 or above.'},
    {'count': sum(r[PAYMENT] != 'No, I wouldn’t pay for it' for r in rows), 'base': 160, 'statement': 'selected a payment-positive or conditional response.'},
    {'count': tools['ChatGPT'], 'base': 160, 'statement': 'selected ChatGPT as an AI tool they use.'},
    {'count': uses['Generate answers/summarisations (including email, content, etc.)'], 'base': 160, 'statement': 'use AI for answers or summarisation.'},
    {'count': fun['Learn by solving real-life challenges'], 'base': 160, 'statement': 'selected real-life challenges as a preferred way to make learning more engaging.'},
    {'count': frequency['Every single day'], 'base': 160, 'statement': 'use AI every single day.'},
    {'count': sum(r[LEARNER] == 'Yes' for r in rows), 'base': 160, 'statement': 'say they regularly learn about AI.'},
    {'count': tools['Claude'], 'base': 160, 'statement': 'selected Claude as an AI tool they use.'},
    {'count': sum(r[EDUCATION] == 'Yes' for r in rows), 'base': 160, 'statement': 'reported formal education in technology.'},
    {'count': uses['Drafting reports, SOPs, or other documents'], 'base': 160, 'statement': 'use AI for reports, SOPs, or other documents.'},
    {'count': tools['Gemini'], 'base': 160, 'statement': 'selected Gemini as an AI tool they use.'},
    {'count': fun['Small goals that keep me going'], 'base': 160, 'statement': 'selected small goals as a preferred learning-engagement mechanism.'},
    {'count': preferences['Practice on real-world problems/projects'], 'base': 108, 'statement': 'selected practice on real-world problems/projects as a learning preference.'},
    {'count': motives['Career Growth'], 'base': 108, 'statement': 'selected career growth as a reason to learn AI.'},
    {'count': motives['Learning'], 'base': 108, 'statement': 'selected learning as a reason to learn AI.'},
    {'count': blockers['I don’t know where to start / what to learn next'], 'base': 160, 'statement': 'selected not knowing where to start or what to learn next as a blocker.'},
    {'count': blockers['I don’t get enough practice'], 'base': 160, 'statement': 'selected insufficient practice as a blocker.'},
], key=lambda item: item['count'], reverse=True)

payload = json.dumps(data).replace('</', '<\\/')
page = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI & Tech Learning Research | Executive Dashboard</title>
<style>
:root{--ink:#102033;--muted:#657487;--paper:#f5f7fb;--card:#fff;--line:#e6ebf2;--blue:#2457f5;--teal:#17a39b;--orange:#ff8d5c;--purple:#7758d9;--yellow:#f4be48}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:14px Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.wrap{max-width:1440px;margin:auto;padding:30px 42px 56px}.eyebrow{color:var(--blue);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}header{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:28px}h1{font-size:32px;letter-spacing:-.04em;margin:7px 0 4px}header p{margin:0;color:var(--muted)}.pill{border:1px solid #cfd8eb;background:#eaf0ff;color:#2146b6;border-radius:30px;padding:7px 10px;font-weight:700;white-space:nowrap}.tabs{display:flex;gap:8px;margin:0 0 22px;flex-wrap:wrap}.tab{border:1px solid var(--line);background:#fff;border-radius:9px;padding:9px 13px;color:#536174;font-weight:700;cursor:pointer}.tab.active{background:var(--ink);border-color:var(--ink);color:#fff}.section{display:none}.section.active{display:block}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px}.kpi,.card{background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:0 3px 12px rgba(23,42,70,.035)}.kpi{padding:18px}.kpi .label{font-size:12px;color:var(--muted);font-weight:700}.kpi .value{font-size:31px;letter-spacing:-.05em;font-weight:800;margin:8px 0 5px}.kpi .note{font-size:12px;color:var(--muted)}.grid{display:grid;grid-template-columns:1.06fr .94fr;gap:14px;margin-bottom:14px}.card{padding:20px}.card h2{font-size:15px;letter-spacing:-.01em;margin:0 0 4px}.sub{margin:0 0 16px;color:var(--muted);font-size:12px}.bars{display:grid;gap:12px}.barrow{display:grid;grid-template-columns:200px 1fr 44px;gap:10px;align-items:center;font-size:12px}.barlabel{color:#425165;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.track{height:9px;border-radius:20px;background:#edf1f6;overflow:hidden}.fill{height:100%;border-radius:20px;background:var(--blue)}.barvalue{text-align:right;font-weight:800}.insight{border-left:3px solid var(--teal);background:#f1fbfa;border-radius:0 9px 9px 0;padding:15px 17px;margin-top:14px;color:#264b4a;line-height:1.5}.table{width:100%;border-collapse:collapse;font-size:13px}.table th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding:0 8px 10px;border-bottom:1px solid var(--line)}.table td{padding:12px 8px;border-bottom:1px solid var(--line)}.table tr:last-child td{border-bottom:none}.tag{font-size:11px;border-radius:12px;padding:4px 7px;background:#eef3ff;color:#3452ad;font-weight:700}.legend{display:flex;gap:15px;color:var(--muted);font-size:12px;margin-bottom:12px}.dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}.method{font-size:12px;line-height:1.55;color:#667589;margin:10px 0 0}@media(max-width:850px){.wrap{padding:22px 16px}.kpis,.grid{grid-template-columns:1fr 1fr}.barrow{grid-template-columns:140px 1fr 38px}}@media(max-width:560px){header{display:block}.pill{display:inline-block;margin-top:12px}.kpis,.grid{grid-template-columns:1fr}.barrow{grid-template-columns:115px 1fr 35px}}
</style></head><body><main class="wrap"><header><div><div class="eyebrow">Primary research · August 2026</div><h1>AI & Tech learning, in one view</h1><p>Executive dashboard · anonymised survey data · n = 160</p></div><div class="pill">Private research view</div></header>
<nav class="tabs"><button class="tab" data-tab="executive">Executive summary</button><button class="tab active" data-tab="overview">Overview</button><button class="tab" data-tab="segments">Role segments</button><button class="tab" data-tab="learning">Learning & blockers</button><button class="tab" data-tab="motivation">Motivation & preferences</button><button class="tab" data-tab="adoption">AI adoption</button><button class="tab" data-tab="cohorts">Builder vs other roles</button><button class="tab" data-tab="demographics">Gender & age patterns</button></nav>
<section id="executive" class="section"><div class="kpis" id="executiveKpis"></div><article class="card"><h2>1. Population map</h2><p class="sub">The bases behind every executive read. The learning-motivation and format questions were answered by 108 regular learners.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Role cohort</th><th>People</th><th>Daily AI use</th><th>Regular learners</th><th>Open / conditional payment</th></tr></thead><tbody id="populationTable"></tbody></table></div></article><article class="card" style="margin-top:14px"><h2>2. Role-segment patterns</h2><p class="sub">Builder roles = Product / Management / Design + Technical / Development / Data. Each pattern is the most-selected response within that cohort.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Role cohort</th><th>Leading reason to learn</th><th>Leading blocker</th><th>Payment signal</th><th>Decision question</th></tr></thead><tbody id="roleExecutiveTable"></tbody></table></div></article><div class="grid" style="margin-top:14px"><article class="card"><h2>3. Gender patterns</h2><p class="sub">Gender groups remain separate from role cohorts.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Group</th><th>People</th><th>Leading blocker</th><th>Payment intent</th></tr></thead><tbody id="genderExecutiveTable"></tbody></table></div></article><article class="card"><h2>4. Age patterns</h2><p class="sub">Low-base groups are shown as directional.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Group</th><th>People</th><th>Leading blocker</th><th>Payment intent</th></tr></thead><tbody id="ageExecutiveTable"></tbody></table></div></article></div><div class="grid"><article class="card"><h2>5. Barrier contrasts worth investigating</h2><p class="sub">Only contrasts at least 10 percentage points from the overall rate and with n ≥ 10.</p><div id="barrierContrastList" class="bars"></div></article><article class="card"><h2>6. Payment contrasts worth investigating</h2><p class="sub">Open / conditional = every payment response except “No.”</p><div id="paymentContrastList" class="bars"></div></article></div><article class="card"><h2>Decision questions for the One-Shot Builder Lab</h2><p class="sub">These are questions prompted by the strongest visible patterns—not conclusions or recommendations.</p><div id="decisionQuestions"></div></article></section>
<section id="overview" class="section active"><div class="kpis" id="kpis"></div><div class="grid"><article class="card"><h2>Role mix</h2><p class="sub">Respondents grouped from their stated role or title</p><div id="segmentBars" class="bars"></div></article><article class="card"><h2>Confidence distribution</h2><p class="sub">Self-rated ability to use technology and AI independently</p><div id="confidenceBars" class="bars"></div><div class="insight"><strong>153 of 160 respondents (96%)</strong> rated their confidence at 3 or above. This is an AI-active audience, not a zero-to-one cohort.</div></article></div><div class="grid"><article class="card"><h2>What they would pay for</h2><p class="sub">Response to help that genuinely improves AI capability</p><div id="paymentBars" class="bars"></div></article><article class="card"><h2>Executive read-out</h2><p class="sub">Directly grounded in survey selections</p><div class="insight"><strong>AI is already habitual:</strong> 117 respondents use it every day.</div><div class="insight"><strong>Learning intent exists:</strong> 108 respondents say they regularly learn about AI.</div><div class="insight"><strong>Demand is conditional:</strong> 149 selected a payment-positive or conditional response; 11 said no.</div></article></div></section>
<section id="segments" class="section"><article class="card"><h2>Segment comparison</h2><p class="sub">Counts and rates are within each role segment. “Build” means respondents who selected Building Products as an AI use.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Segment</th><th>n</th><th>Daily AI use</th><th>Avg confidence</th><th>Regular learners</th><th>Use AI to build</th></tr></thead><tbody id="segmentTable"></tbody></table></div></article><div class="grid" style="margin-top:14px"><article class="card"><h2>Largest segment</h2><p class="sub">Product / management / design</p><div id="productDetail" class="bars"></div></article><article class="card"><h2>Technical segment</h2><p class="sub">Technical / development / data</p><div id="technicalDetail" class="bars"></div></article></div></section>
<section id="learning" class="section"><div class="grid"><article class="card"><h2>Learning blockers</h2><p class="sub">Multiple selections allowed; counts do not sum to 160</p><div id="blockerBars" class="bars"></div></article><article class="card"><h2>What would make learning more engaging</h2><p class="sub">Multiple selections allowed</p><div id="funBars" class="bars"></div></article></div><div class="grid"><article class="card"><h2>Where regular learners go</h2><p class="sub">Among the 108 respondents who regularly learn about AI</p><div id="sourceBars" class="bars"></div></article><article class="card"><h2>Implication for the pilot</h2><p class="sub">A descriptive read—not a causal claim</p><div class="insight"><strong>Practice and direction are recurring selections.</strong> A bounded, real-work challenge aligns with both needs.</div><div class="insight"><strong>Real-life challenges and small goals lead engagement choices.</strong> This supports a one-shot, outcome-first format rather than a broad content library.</div></article></div></section>
<section id="motivation" class="section"><div class="grid"><article class="card"><h2>Why respondents want to learn AI</h2><p class="sub">Multiple selections allowed; n = 108 respondents who answered this question</p><div id="motiveBars" class="bars"></div></article><article class="card"><h2>Learning approach</h2><p class="sub">Conceptual understanding and practice preference</p><div id="preferenceBars" class="bars"></div></article></div><div class="grid"><article class="card"><h2>Preferred learning format</h2><p class="sub">Multiple selections allowed</p><div id="formatBars" class="bars"></div></article><article class="card"><h2>Data reading note</h2><p class="sub">Handling multi-select responses</p><div class="insight">Options are matched against each full survey response. The dashboard <strong>does not split blindly on commas</strong>, because some valid option labels contain commas.</div><div class="insight">Custom written responses are retained in the source but excluded from named-option charts unless they exactly match a survey option.</div></article></div></section>
<section id="adoption" class="section"><div class="grid"><article class="card"><h2>AI tool use</h2><p class="sub">Multiple selections allowed</p><div id="toolBars" class="bars"></div></article><article class="card"><h2>What AI is used for</h2><p class="sub">Multiple selections allowed</p><div id="useBars" class="bars"></div></article></div><article class="card"><h2>Usage frequency</h2><p class="sub">How often respondents use AI</p><div id="frequencyBars" class="bars"></div><p class="method">Method note: The dashboard includes every non-empty row in the source workbook (160 responses). It excludes timestamp and email address fields. Multi-select questions are counted once per respondent per named option. Role segments use stated role/title and are documented in the accompanying research plan.</p></article></section>
<section id="cohorts" class="section"><div class="kpis" id="cohortKpis"></div><article class="card"><h2>Builder roles compared with all other roles</h2><p class="sub">Builder roles = Product / Management / Design + Technical / Development / Data. All percentages are within the cohort.</p><div style="overflow:auto"><table class="table"><thead><tr><th>Measure</th><th>Builder roles</th><th>All other roles</th><th>Difference</th></tr></thead><tbody id="cohortTable"></tbody></table></div></article><div class="grid" style="margin-top:14px"><article class="card"><h2>Use-case pattern</h2><p class="sub">Share selecting each AI use</p><div id="cohortUses" class="bars"></div></article><article class="card"><h2>Learning-blocker pattern</h2><p class="sub">Share selecting each blocker</p><div id="cohortBlockers" class="bars"></div></article></div></section>
<section id="demographics" class="section"><article class="card"><h2>Patterns by gender and age</h2><p class="sub">Choose a lens. Counts are selections within each group; percentages use that group as the denominator, except learning sources which use regular learners in that group. The single “Prefer not to say” response is retained in calculations but not compared visually.</p><div class="legend"><label>Group <select id="demoDimension"><option value="gender">Gender</option><option value="age">Age group</option></select></label><label>Question area <select id="demoMeasure"><option value="adoption">AI adoption</option><option value="frequency">AI use frequency</option><option value="education">Formal tech education</option><option value="experience">Professional experience</option><option value="tools">Tools used</option><option value="uses">AI uses</option><option value="blockers">Learning blockers</option><option value="fun">Engagement preferences</option><option value="motives">Reasons to learn</option><option value="preferences">Learning approach</option><option value="formats">Learning format</option><option value="sources">Learning sources</option><option value="payment">Payment intent</option></select></label></div><div style="overflow:auto"><table class="table"><thead id="demoHead"></thead><tbody id="demoBody"></tbody></table></div></article><div class="grid" style="margin-top:14px"><article class="card"><h2>Group sizes</h2><p class="sub">Use these bases when interpreting comparisons</p><div id="demoSizes" class="bars"></div></article><article class="card"><h2>Reading this view</h2><p class="sub">Data discipline</p><div class="insight">This is descriptive primary research. Differences show how respondents in each stated group answered; they do not establish why those differences exist.</div><div class="insight">Small groups should be read cautiously—especially the 50+ age group and “Prefer not to say” gender response.</div></article></div></section>
</main><script>const D=''' + payload + ''';
const palette=['#2457f5','#17a39b','#7758d9','#ff8d5c','#f4be48','#607089','#9ba9bd'];
function bars(id,obj,short={}){const el=document.getElementById(id), max=Math.max(...Object.values(obj));el.innerHTML=Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(([k,v],i)=>`<div class="barrow"><div class="barlabel" title="${k}">${short[k]||k}</div><div class="track"><div class="fill" style="width:${(v/max*100).toFixed(1)}%;background:${palette[i%palette.length]}"></div></div><div class="barvalue">${v}</div></div>`).join('')}
function pct(x,n){return Math.round(x/n*100)+'%'}
document.getElementById('kpis').innerHTML=[['Responses',D.n,'Verified survey sample'],['Daily AI use',pct(D.daily,D.n),D.daily+' people'],['Regular learners',pct(D.learners,D.n),D.learners+' people'],['Avg confidence',D.avgConfidence+'/5','Self-reported']].map(x=>`<div class="kpi"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="note">${x[2]}</div></div>`).join('');
const shortPayment={'Maybe, if it genuinely helps me':'Maybe, if it helps','Definitely - take my money!':'Definitely','Only if my employer paid':'Employer-paid','No, I wouldn’t pay for it':'No'};
function lowBase(x){return x.n<10?' <span class="tag">Directional — low base</span>':''}function blockerText(x){return `${x.blocker} <span class="tag">${x.blockerCount}/${x.n}</span>`}function payText(x){return `<strong>${x.payOpen}/${x.n} open / conditional</strong><br><span style="color:#657487">Top: ${shortPayment[x.payment]||x.payment} (${x.paymentCount})</span>`}
document.getElementById('executiveKpis').innerHTML=[['All responses',D.n,'Anonymised primary research'],['Builder roles',D.roleExecutive[0].n,'Product/design/management + technical'],['Regular learners',D.learners,'Base for motivation and format'],['Open / conditional pay',pct(D.overallPayOpen,D.n),Math.round(D.overallPayOpen*D.n)+' respondents']].map(x=>`<div class="kpi"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="note">${x[2]}</div></div>`).join('');
document.getElementById('populationTable').innerHTML=D.roleExecutive.map(x=>`<tr><td><strong>${x.name}</strong></td><td>${x.n}</td><td>${pct(x.daily,x.n)}</td><td>${pct(x.learners,x.n)}</td><td>${pct(x.payOpen,x.n)}</td></tr>`).join('');
document.getElementById('roleExecutiveTable').innerHTML=D.roleExecutive.map(x=>`<tr><td><strong>${x.name}</strong> (n=${x.n})</td><td>${x.motive} <span class="tag">${x.motiveCount}/${x.motiveBase}</span></td><td>${blockerText(x)}</td><td>${payText(x)}</td><td>Should the pilot explicitly test whether a real-work challenge reduces the reported ${x.blocker.toLowerCase()} barrier?</td></tr>`).join('');
function demographicRows(id,items){document.getElementById(id).innerHTML=items.map(x=>`<tr><td><strong>${x.name}</strong>${lowBase(x)}</td><td>${x.n}</td><td>${blockerText(x)}</td><td>${payText(x)}</td></tr>`).join('')}demographicRows('genderExecutiveTable',D.genderExecutive);demographicRows('ageExecutiveTable',D.ageExecutive);
function contrastList(id,items,kind){const el=document.getElementById(id);if(!items.length){el.innerHTML='<p class="sub">No qualifying contrast met the 10-point and n ≥ 10 thresholds.</p>';return}const max=Math.max(...items.map(x=>Math.abs(x.delta)));el.innerHTML=items.map(x=>{const direction=x.delta>0?'above':'below',label=kind==='barrier'?x.blocker:'open / conditional payment';return `<div class="barrow"><div class="barlabel" title="${x.group}"><strong>${x.group}</strong><br>${label}</div><div class="track"><div class="fill" style="width:${Math.abs(x.delta)/max*100}%;background:${x.delta>0?'#ff8d5c':'#2457f5'}"></div></div><div class="barvalue">${x.count}/${x.n}<br>${Math.round(x.rate*100)}% · ${Math.abs(Math.round(x.delta*100))}pp ${direction}</div></div>`}).join('')}
contrastList('barrierContrastList',D.barrierContrasts,'barrier');contrastList('paymentContrastList',D.paymentContrasts,'payment');
const qs=[];const rb=D.roleExecutive[0],ro=D.roleExecutive[1];qs.push(`Should the pilot compare a practice-first framing for <strong>Builder roles</strong> (${rb.blockerCount}/${rb.n} selected ${rb.blocker}) with a direction-first framing for <strong>all other roles</strong> (${ro.blockerCount}/${ro.n} selected ${ro.blocker})?`);if(D.barrierContrasts.length){const x=D.barrierContrasts[0];qs.push(`Should the pilot investigate why <strong>${x.group}</strong> reports <strong>${x.blocker}</strong> at ${x.count}/${x.n} (${Math.round(x.rate*100)}%), ${Math.abs(Math.round(x.delta*100))} percentage points ${x.delta>0?'above':'below'} the overall rate?`)}else if(D.paymentContrasts.length){const x=D.paymentContrasts[0];qs.push(`Should payment research distinguish <strong>${x.group}</strong>, where ${x.count}/${x.n} (${Math.round(x.rate*100)}%) are open to paying, from the overall ${Math.round(D.overallPayOpen*100)}%?`)}qs.push(`Should the One-Shot Builder Lab test whether real-work challenges address the needs of the ${D.fun['Learn by solving real-life challenges']}/${D.n} respondents who selected that engagement mechanism?`);document.getElementById('decisionQuestions').innerHTML=qs.slice(0,3).map((q,i)=>`<div class="insight"><strong>Question ${i+1}.</strong> ${q}</div>`).join('');
bars('segmentBars',Object.fromEntries(Object.entries(D.segments).map(([k,v])=>[k,v.n])));bars('confidenceBars',D.confidence,Object.fromEntries(Object.keys(D.confidence).map(k=>[k,k+' / 5'])));bars('paymentBars',D.payment,{'Maybe, if it genuinely helps me':'Maybe, if it helps','Definitely - take my money!':'Definitely','Only if my employer paid':'Employer-paid','No, I wouldn’t pay for it':'No'});bars('blockerBars',D.blockers,{'I don’t know where to start / what to learn next':'Don’t know where to start','I don’t get enough practice':'Not enough practice','Courses/Tools are expensive':'Cost','Content is too theoretical':'Too theoretical','I get stuck when something doesn’t work':'Get stuck','I lose motivation':'Motivation','Concepts are difficult to understand':'Difficult concepts','I can’t apply it to my actual work':'Cannot apply at work','I understand tutorials but can’t do it myself':'Tutorials → doing'});bars('funBars',D.fun,{'Learn by solving real-life challenges':'Real-life challenges','Small goals that keep me going':'Small goals','Learn with friends or a community':'Community','A guide who helps when I’m stuck':'Guide when stuck','Games, levels or challenges':'Games / levels'});bars('sourceBars',D.sources);bars('motiveBars',D.motives,{'Career Growth':'Career growth','Current job requirements':'Job requirements','Building your own products':'Build products','Fear Of Missing Out (aka FOMO)':'FOMO'});bars('preferenceBars',D.preferences,{'Understand the concept':'Understand concepts','Practice on real-world problems/projects':'Practice on real work'});bars('formatBars',D.formats,{'Short daily lessons (5-10 minutes)':'Short daily lessons','Read about it / Figure it out myself':'Read / figure out myself','Long form videos (1-2 hours)':'Long videos'});bars('toolBars',D.tools);bars('useBars',D.uses,{'Generate answers/summarisations':'Answers / summaries','Drafting reports, SOPs, or other documents':'Documents / reports','Data Analysis':'Data analysis','Image Generation':'Image generation','Building Products':'Building products'});bars('frequencyBars',D.frequency,{'Every single day':'Every day','A few times a week':'Few times / week','Only once or twice a month':'Once or twice / month'});
document.getElementById('segmentTable').innerHTML=Object.entries(D.segments).sort((a,b)=>b[1].n-a[1].n).map(([k,v])=>`<tr><td><strong>${k}</strong></td><td>${v.n}</td><td><span class="tag">${pct(v.daily,v.n)}</span></td><td>${v.confidence} / 5</td><td>${pct(v.learning,v.n)}</td><td>${pct(v.build,v.n)}</td></tr>`).join('');
function detail(id,name){const v=D.segments[name];bars(id,{'Daily AI use':v.daily,'Regular learners':v.learning,'Use AI to build':v.build})}detail('productDetail','Product / management / design');detail('technicalDetail','Technical / development / data');
const B=D.cohorts['Builder roles'],O=D.cohorts['All other roles'];
document.getElementById('cohortKpis').innerHTML=[['Builder roles',B.n,'Product / management / design + technical'],['All other roles',O.n,'All remaining stated roles'],['Daily AI use',pct(B.daily,B.n)+' vs '+pct(O.daily,O.n),'Builder vs other roles'],['Regular learners',pct(B.learners,B.n)+' vs '+pct(O.learners,O.n),'Builder vs other roles']].map(x=>`<div class="kpi"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="note">${x[2]}</div></div>`).join('');
const cohortRows=[['Daily AI use',B.daily/B.n,O.daily/O.n,'pct'],['Regular AI learners',B.learners/B.n,O.learners/O.n,'pct'],['Confidence 4 or 5',B.highConfidence/B.n,O.highConfidence/O.n,'pct'],['Average confidence',B.confidence,O.confidence,'score'],['Open to paying',B.payOpen/B.n,O.payOpen/O.n,'pct'],['Use AI for building products',B.uses['Building Products']/B.n,O.uses['Building Products']/O.n,'pct']];
document.getElementById('cohortTable').innerHTML=cohortRows.map(([m,a,b,t])=>{const f=x=>t==='pct'?Math.round(x*100)+'%':x.toFixed(2)+' / 5';const d=t==='pct'?Math.round((a-b)*100)+' pp':(a-b).toFixed(2);return `<tr><td><strong>${m}</strong></td><td>${f(a)}</td><td>${f(b)}</td><td>${d}</td></tr>`}).join('');
function paired(id,key){const a=B[key],b=O[key],out={};Object.keys(a).forEach(k=>out[k]=Math.round(a[k]/B.n*100));bars(id,out);const el=document.getElementById(id);el.querySelectorAll('.barrow').forEach((e,i)=>{const key=Object.entries(out).sort((x,y)=>y[1]-x[1])[i][0];e.querySelector('.barvalue').textContent=out[key]+'% / '+Math.round(b[key]/O.n*100)+'%'});}paired('cohortUses','uses');paired('cohortBlockers','blockers');
const labels={frequency:'AI use frequency',education:'Formal tech education',experience:'Professional experience',tools:'Tools used',uses:'AI uses',blockers:'Learning blockers',fun:'Engagement preferences',motives:'Reasons to learn',preferences:'Learning approach',formats:'Learning format',sources:'Learning sources',payment:'Payment intent'};
function demo(){const dim=document.getElementById('demoDimension').value,measure=document.getElementById('demoMeasure').value,groups=D[dim];const visible=Object.entries(groups).filter(([k,v])=>!(dim==='gender'&&k==='Prefer not to say'));let rows,base=v=>measure==='sources'?v.learners:v.n;if(measure==='adoption'){rows=[['Daily AI use',...visible.map(([,v])=>pct(v.daily,v.n))],['Regular AI learners',...visible.map(([,v])=>pct(v.learners,v.n))],['Confidence 4 or 5',...visible.map(([,v])=>pct(v.highConfidence,v.n))],['Average confidence',...visible.map(([,v])=>v.confidence+' / 5')],['Open to paying',...visible.map(([,v])=>pct(v.payOpen,v.n))]]}else if(measure==='education'){rows=[['Formal technology education: Yes',...visible.map(([,v])=>pct(v.formalEducation,v.n))]]}else{const keys=Object.keys(visible[0][1][measure]);rows=keys.map(k=>[k,...visible.map(([,v])=>pct(v[measure][k],base(v)))])}document.getElementById('demoHead').innerHTML='<tr><th>'+ (measure==='adoption'||measure==='education'?'Measure':labels[measure])+'</th>'+visible.map(([k,v])=>'<th>'+k+' (n='+base(v)+')</th>').join('')+'</tr>';document.getElementById('demoBody').innerHTML=rows.map(r=>'<tr>'+r.map((x,i)=>'<td>'+ (i===0?'<strong>'+x+'</strong>':x)+'</td>').join('')+'</tr>').join('');bars('demoSizes',Object.fromEntries(visible.map(([k,v])=>[k,base(v)])))}
document.getElementById('demoDimension').onchange=demo;document.getElementById('demoMeasure').onchange=demo;demo();
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.section').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById(b.dataset.tab).classList.add('active');});
</script></body></html>'''
OUTPUT.write_text(page, encoding='utf-8')
print(f'Created {OUTPUT}')
