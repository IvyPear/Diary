// app.js - Main App Initialization
import { StorageManager } from './modules/storage.js';
import { initTheme, setTheme } from './modules/theme.js';
import { DiaryManager } from './modules/diary.js';
import { TimelineManager } from './modules/timeline.js';
import { ReflectionManager } from './modules/reflection.js';
import { Utils } from './modules/utils.js';
import { ChartManager } from './modules/chart.js';
import { ReportManager } from './modules/report.js';


// APP STATE

export const APP_STATE = {
    currentView: 'diary',
    currentTheme: 'mint',
    moods: ['😊', '😢', '😡', '😴', '✨'],
    moodColors: {
        '😊': '#AEE6E6',
        '😢': '#ADD8E6',
        '😡': '#FFC0CB',
        '😴': '#D8BFD8',
        '✨': '#7FC7C7'
    }
};

// =====================
// PUBLIC FUNCTIONS (HTML handlers)
// =====================
export function saveDailyEntry() {
    const result = DiaryManager.saveDailyEntry();
    if (result) {
        Utils.updateStreakCounter();
        setTimeout(() => {
            Utils.showNotification(
                'Nhật ký đã được lưu và reset sẵn sàng cho ngày mới! 🎉',
                'success'
            );
        }, 500);
    }
    return result;
}

export function editEntry(entryId) {
    return DiaryManager.loadEntryForEdit(entryId);
}

export function deleteEntry(entryId) {
    if (confirm('Bạn có chắc chắn muốn xóa nhật ký này không?')) {
        return DiaryManager.deleteEntry(entryId);
    }
    return false;
}

export function saveMoment() {
    const name = document.getElementById('moment-name')?.value.trim();
    const desc = document.getElementById('moment-desc')?.value.trim();

    if (!name) {
        Utils.showNotification('Vui lòng nhập tên khoảnh khắc', 'warning');
        return false;
    }

    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const momentData = {
        id: `moment_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name,
        description: desc,
        date: dateString,
        mood: '⭐',
        type: 'manual',
        timestamp: today.getTime()
    };

    const moments = StorageManager.get('moments', []);
    moments.unshift(momentData);
    StorageManager.set('moments', moments);

    document.getElementById('moment-name').value = '';
    document.getElementById('moment-desc').value = '';
    document.getElementById('moment-input').classList.add('hidden');

    Utils.showNotification('Khoảnh khắc đã được lưu! 🌟', 'success');

    if (APP_STATE.currentView === 'timeline') {
        TimelineManager.loadTimelineEntries();
    }

    return true;
}

export function saveReflection() {
    return ReflectionManager.saveReflection();
}

export function exportData() {
    return Utils.exportData();
}

export function clearFilters() {
    return TimelineManager.clearFilters();
}

// =====================
// VIEW SWITCHING
// =====================
export function switchView(viewName) {
    APP_STATE.currentView = viewName;

    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`${viewName}-page`)?.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-accent-light', 'font-bold');
        btn.style.backgroundColor = '';
    });

    const activeBtn = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (activeBtn) {
        const accentLight = getComputedStyle(document.body)
            .getPropertyValue('--accent-light');
        activeBtn.classList.add('bg-accent-light', 'font-bold');
        activeBtn.style.backgroundColor = accentLight;
    }

    if (viewName === 'report') lazyLoadChart();
    if (viewName === 'timeline') TimelineManager.loadTimelineEntries();
    if (viewName === 'reflection') ReflectionManager.loadReflection();

    window.scrollTo({
        top: 0,
        behavior: window.innerWidth < 768 ? 'auto' : 'smooth'
    });
}

// =====================
// THEME PANEL
// =====================
export function toggleThemePanel() {
    const panel = document.getElementById('theme-panel');
    if (!panel) return;

    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        if (window.innerWidth >= 768) panel.classList.add('animate-fadeIn');
    } else {
        panel.classList.add('animate-fadeOut');
        setTimeout(() => {
            panel.classList.add('hidden');
            panel.classList.remove('animate-fadeOut');
        }, 300);
    }
}

// =====================
// LAZY CHART
// =====================
let chartLoaded = false;
function lazyLoadChart() {
    if (chartLoaded) return;
    chartLoaded = true;

    ('requestIdleCallback' in window)
        ? requestIdleCallback(() => ChartManager.drawCharts())
        : setTimeout(() => ChartManager.drawCharts(), 300);
}

// =====================
// SETUP FUNCTIONS (POST INIT)
// =====================
function setupMoodSelector() {
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const buttonColor = getComputedStyle(document.body)
                .getPropertyValue('--button-bg');
            const accentLight = getComputedStyle(document.body)
                .getPropertyValue('--accent-light');

            document.querySelectorAll('.mood-btn').forEach(b => {
                b.style.backgroundColor = accentLight;
                b.classList.remove('ring-4', 'ring-offset-2');
            });

            e.currentTarget.style.backgroundColor = buttonColor;
            e.currentTarget.classList.add('ring-4', 'ring-offset-2');

            e.currentTarget.style.transform = 'scale(0.95)';
            setTimeout(() => (e.currentTarget.style.transform = ''), 150);
        });
    });
}

function setupSelfCareChecklist() {
    document.querySelectorAll('.pastel-checkbox').forEach(label => {
        const input = label.querySelector('input');
        label.addEventListener('click', () => {
            if (input.checked) {
                const icon = label.querySelector('.checkbox-icon');
                icon?.classList.add('animate-bounce-once');
                setTimeout(() => {
                    icon?.classList.remove('animate-bounce-once');
                }, 500);
            }
        });
    });
}

function setupAutoSave() {
    let timeout;
    document.addEventListener('input', e => {
        if (!e.target.matches('textarea, input[type="text"]')) return;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const indicator = document.getElementById('save-status');
            if (!indicator) return;

            indicator.textContent = 'Đã lưu tự động';
        }, 2000);
    });
}

// =====================
// POST INIT (DEFERRED)
// =====================
function postInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setupMoodSelector();
    setupSelfCareChecklist();
    Utils.setupPhotoUpload();
    setupAutoSave();

    document.getElementById('photo-journal')?.classList.remove('hidden');
}

// =====================
// INITIALIZE APP (FIRST PAINT)
// =====================
export function initializeApp() {
    document.documentElement.classList.add('preload');
    window.addEventListener('load', () => {
        document.documentElement.classList.remove('preload');
    });

    StorageManager.initializeDefaults();
    initTheme();
    Utils.updateStreakCounter();
    DiaryManager.loadTodayEntry();
    switchView(APP_STATE.currentView);

    ('requestIdleCallback' in window)
        ? requestIdleCallback(postInit)
        : setTimeout(postInit, 500);
}

// =====================
// GLOBAL EXPORTS
// =====================
window.switchView = switchView;
window.toggleThemePanel = toggleThemePanel;
window.setTheme = setTheme;
window.saveDailyEntry = saveDailyEntry;
window.saveMoment = saveMoment;
window.saveReflection = saveReflection;
window.clearFilters = clearFilters;
window.exportData = exportData;
window.editEntry = editEntry;
window.deleteEntry = deleteEntry;

// =====================
// BOOTSTRAP
// =====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
