// Path
import path from '../config.js';

// Plugins
import del from 'del';

const clean = () => del(path.clean.all);

export default clean;