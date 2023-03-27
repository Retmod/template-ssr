import path from 'path';

const cwd = process.cwd();

const paths = {
	rootFolder: path.join(cwd),
	htmlTemplate: path.join(cwd, 'src', 'util', 'template.html'),
	clientFolder: path.join(cwd, 'src', 'client'),
	clientBuildFolder: path.join(cwd, '.retmod', 'dist', 'client'),
	serverFolder: path.join(cwd, 'src', 'server'),
	serverBuildFolder: path.join(cwd, '.retmod', 'dist', 'server'),
};

export default paths;
