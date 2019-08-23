import React from 'react';
import './filter.css';

const Filter = ({ updateFilterStatus, filterStatus }) => {
	return (
		<div className="filters">
			<button
				className={filterStatus === 'all' ? 'filter-active' : 'filter'}
				onClick={() => updateFilterStatus('all')}>
				all
			</button>
			<button
				className={filterStatus === 'online' ? 'filter-active' : 'filter'}
				onClick={() => updateFilterStatus('online')}>
				online
			</button>
			<button
				className={filterStatus === 'offline' ? 'filter-active' : 'filter'}
				onClick={() => updateFilterStatus('offline')}>
				offline
			</button>
			<button
				className={filterStatus === 'open' ? 'filter-active' : 'filter'}
				onClick={() => updateFilterStatus('open')}>
				open
			</button>
			<div className="space">
			</div>
		</div>
	)
}

export default Filter;