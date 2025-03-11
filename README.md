# Data Scientist Portfolio Website

A modern, responsive personal website built with Next.js and Tailwind CSS to showcase your data science expertise, projects, and skills.

## Features

- Modern and responsive design
- Dark mode support
- Smooth animations and transitions
- SEO optimized
- Contact form with EmailJS integration
- Interactive skill bars
- Project showcase section
- Mobile-friendly navigation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS
- React Intersection Observer

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Configure EmailJS:
   - Sign up for an account at [EmailJS](https://www.emailjs.com/)
   - Create a new email service
   - Create an email template
   - Replace the credentials in `src/app/sections/Contact.tsx`:
     ```typescript
     emailjs.send(
       'YOUR_SERVICE_ID',
       'YOUR_TEMPLATE_ID',
       {
         from_name: formData.name,
         from_email: formData.email,
         message: formData.message,
       },
       'YOUR_PUBLIC_KEY'
     )
     ```

4. Customize content:
   - Update personal information in `src/app/sections/About.tsx`
   - Modify projects in `src/app/sections/Projects.tsx`
   - Adjust skills in `src/app/sections/Skills.tsx`
   - Update social links in `src/app/sections/Contact.tsx`

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

7. Start the production server:
```bash
npm start
```

## Customization

### Styling
- Colors and theme can be customized in `tailwind.config.js`
- Component-specific styles are in their respective files
- Global styles are in `src/app/globals.css`

### Content
- Update the metadata in `src/app/layout.tsx`
- Modify section content in their respective files under `src/app/sections/`
- Add or remove sections by updating `src/app/page.tsx`

### Components
- All components are modular and can be modified independently
- Add new components in `src/app/components/`
- Section components are in `src/app/sections/`

## Deployment

The website can be deployed to various platforms:

- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages
- Any static hosting service

## License

MIT License - feel free to use this template for your personal portfolio

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
