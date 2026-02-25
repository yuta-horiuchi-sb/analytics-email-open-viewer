/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Generates a scoped CSS string to prevent style conflicts with the host application.
 * By wrapping all selectors with a parent scope class (e.g., '.individual-email-widget .widget-header'),
 * we ensure these styles only apply within this specific component.
 * @param scope The parent class name to use for scoping all CSS rules.
 * @returns A complete CSS string with all rules scoped.
 */
export const getScopedWidgetStyles = (scope: string): string => `
    .${scope} { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 20px; color: #333; }
    .${scope} .widget-header { display: flex; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; border-bottom: 1px solid #F0F0F0; padding-bottom: 15px; }
    .${scope} .widget-header.list-view { justify-content: space-between; }
    .${scope} .widget-title { font-size: 1.2em; font-weight: 600; color: #0d51a1; margin: 0; flex-grow: 1; }
    .${scope} .message-container { text-align: center; padding: 40px 20px; color: #777; }
    .${scope} .back-button { background-color: #0d51a1; border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2em; display: flex; align-items: center; justify-content: center; padding: 0; transition: background-color 0.2s; margin-right: 15px; }
    .${scope} .back-button:hover { background-color: #4594E0; }
    .${scope} .date-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .${scope} .date-controls label { font-size: 0.9em; font-weight: 500; }
    .${scope} .date-controls input { border: 1px solid #ccc; border-radius: 4px; padding: 5px 8px; font-family: inherit; width: auto; }
    .${scope} .detail-view-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 20px; }
    .${scope} .filter-and-date-container { display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
    .${scope} .recipient-filter input { background-color: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 8px; width: 100%; max-width: 250px; box-sizing: border-box; }
    .${scope} .date-picker-group { display: flex; align-items: center; gap: 8px; }
    .${scope} .date-picker-group label { font-size: 0.9em; color: #666; }
    .${scope} .date-picker-group input { border: 1px solid #ccc; border-radius: 4px; padding: 5px 8px; font-family: inherit; }
    .${scope} .stats-and-export-container { display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
    .${scope} .export-csv-button { display: flex; align-items: center; justify-content: center; background-color: #2F793D; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; font-size: 0.9em; }
    .${scope} .export-csv-button:hover:not(:disabled) { background-color: #256430; }
    .${scope} .export-csv-button:disabled { background-color: #ccc; color: #f7f7f7; cursor: not-allowed; }
    .${scope} .email-stats-container { display: flex; gap: 25px; background-color: #f9f9fb; padding: 10px 20px; border-radius: 8px; border: 1px solid #F0F0F0; }
    .${scope} .stat-item { text-align: center; }
    .${scope} .stat-value { display: block; font-size: 1.6em; font-weight: 600; color: #0d51a1; }
    .${scope} .stat-label { font-size: 0.8em; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
    .${scope} .email-list-item { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 15px; border-bottom: 1px solid #F0F0F0; cursor: pointer; transition: background-color 0.2s; border-radius: 4px; }
    .${scope} .email-list-item:hover { background-color: #f9f9fb; }
    .${scope} .email-list-item-left { display: flex; align-items: center; gap: 15px; flex-grow: 1; }
    .${scope} .email-list-item-right { display: flex; align-items: center; gap: 15px; color: #aaa; }
    .${scope} .recipient-count-pill { background-color: #f0f0f0; color: #545459; padding: 4px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 500; white-space: nowrap; }
    .${scope} .email-thumbnail { width: 80px; height: 60px; object-fit: cover; border-radius: 4px; flex-shrink: 0; border: 1px solid #eee; }
    .${scope} .email-info { flex-grow: 1; }
    .${scope} .email-title { font-size: 1.05em; font-weight: 600; margin: 0 0 4px 0; color: #111; }
    .${scope} .email-meta { font-size: 0.85em; color: #666; margin: 0; }
    .${scope} .email-chevron { font-size: 1em; transform: translateX(0); transition: transform 0.2s; }
    .${scope} .email-list-item:hover .email-chevron { transform: translateX(5px); }
    .${scope} .performance-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    .${scope} .performance-table th { background-color: #f9f9fb; text-align: left; padding: 12px 15px; font-weight: 600; border-bottom: 2px solid #F0F0F0; }
    .${scope} .performance-table th[role="button"] { cursor: pointer; }
    .${scope} .recipient-row.expandable { cursor: pointer; }
    .${scope} .recipient-row.expandable:hover { background-color: #f9f9fb; }
    .${scope} .performance-table td { padding: 12px 15px; border-bottom: 1px solid #F0F0F0; vertical-align: middle; }
    .${scope} .user-info { display: flex; align-items: center; gap: 12px; }
    .${scope} .user-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
    .${scope} .user-avatar-placeholder { display: flex; align-items: center; justify-content: center; background-color: #F0F0F0; padding: 5px; box-sizing: border-box; }
    .${scope} .status-cell { display: flex; justify-content: space-between; align-items: center; }
    .${scope} .status-badge { padding: 4px 10px; border-radius: 12px; font-size: 0.8em; font-weight: 600; white-space: nowrap; }
    .${scope} .status-badge .open-count { font-weight: 500; opacity: 0.8; margin-left: 4px; }
    .${scope} .status-badge.opened { background-color: #dff0d8; color: #2F793D; }
    .${scope} .status-badge.sent { background-color: #d9edf7; color: #31708f; }
    .${scope} .status-badge.unknown { background-color: #f2f2f2; color: #777; }
    .${scope} .chevron { font-size: 0.8em; color: #888; transition: transform 0.2s ease-in-out; display: inline-block; }
    .${scope} .chevron.expanded { transform: rotate(90deg); }
    .${scope} .details-row td { background-color: #fdfdfd; padding: 0; }
    .${scope} .details-container { padding: 15px 25px; border-left: 3px solid #4594E0; }
    .${scope} .detail-block { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px dashed #e0e0e0; }
    .${scope} .detail-block:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
    .${scope} .detail-block p { margin: 0 0 5px 0; }
    .${scope} .detail-block ul { list-style-type: none; padding-left: 0; margin: 10px 0 0; }
    .${scope} .detail-block li { background-color: #f4f8fd; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 0.9em; }
    .${scope} .detail-block li strong { display: block; margin-bottom: 4px; color: #545459; font-size: 0.9em; }
    .${scope} .detail-block a { color: #0d51a1; text-decoration: none; word-break: break-all; }
    .${scope} .detail-block a:hover { text-decoration: underline; }
    .${scope} .pagination-controls { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 20px; }
    .${scope} .page-size-control { display: flex; align-items: center; gap: 8px; }
    .${scope} .page-size-control label { font-size: 0.9em; color: #666; }
    .${scope} .page-size-control select { border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px; font-size: 0.9em; background-color: #fff; }
    .${scope} .page-buttons { display: flex; align-items: center; gap: 8px; }
    .${scope} .pagination-controls button { background-color: #0d51a1; border: none; color: white; border-radius: 50%; width: 32px; height: 32px; font-size: 1.2em; display: flex; align-items: center; justify-content: center; padding: 0; cursor: pointer; transition: background-color 0.2s; }
    .${scope} .pagination-controls button:hover:not(:disabled) { background-color: #4594E0; }
    .${scope} .pagination-controls button:disabled { background-color: #ccc; color: #f7f7f7; cursor: not-allowed; }
    .${scope} .pagination-controls button:disabled:hover { background-color: #ccc; }
`;