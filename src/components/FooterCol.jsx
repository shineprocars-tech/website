

const FooterCol = ({ title, links }) => (
  <div>
    <h5 className="font-bold mb-4 text-gray-900">{title}</h5>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-gray-600 hover:text-orange-500 transition"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterCol;