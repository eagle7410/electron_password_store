import {
	panelUsers,
	panelSettings,
	rowStoreLabel,
} from './Colors'

const tabUsers = {
	background: panelUsers
};
const tabSettings = {
	background: panelSettings
};

const styleDataLabel = {
	color : rowStoreLabel
};
const styleRow = {
	overflow: 'visible',
	fontSize : '18px'
};
const styleBlockInCell = {
	display : 'inline-block'
};
const styleArea = {
	width : '100%',
	fontSize : '18px'
};
const styleBlock = {
	width: '100%',
	maxWidth: 700,
	margin: 'auto'
};
const styleButtonBlock = {
	marginTop: 24,
	marginBottom: 12
};
const styleContent = {
	margin: '0 16px',
	overflow: 'hidden'
};

export {
	tabUsers,
	tabSettings,
	styleDataLabel, styleRow, styleBlockInCell, styleArea,
	styleBlock, styleButtonBlock,
	styleContent
}
