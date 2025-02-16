// src/components/ui/index.js
export const Button = (props) => <button {...props}>{props.children}</button>;
export const Card = (props) => <div {...props} className="card">{props.children}</div>;
export const CardContent = (props) => <div className="card-content">{props.children}</div>;
