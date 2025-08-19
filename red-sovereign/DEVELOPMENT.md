# Red Sovereign Development Guide

## 🏗️ Project Structure

This is a **monorepo** with the Next.js application located in the `red-sovereign/` directory:

```
root/
├── vercel.json           # Deployment configuration (points to red-sovereign/)
├── red-sovereign/        # Main Next.js application
│   ├── src/             # Application source code
│   ├── public/          # Static assets
│   ├── package.json     # Dependencies and scripts
│   ├── next.config.ts   # Next.js configuration
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.example     # Environment variable template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm (comes with Node.js)

### Setup Commands

```bash
# 1. Navigate to the application directory
cd red-sovereign

# 2. Install dependencies
npm install

# 3. Copy environment variables template
cp .env.example .env.local

# 4. Start development server
npm run dev
```

The application will be available at http://localhost:3000

## ⚙️ Development Commands

All commands should be run from the `red-sovereign/` directory:

```bash
# Development
npm run dev                 # Start development server
npm run build              # Production build
npm run start              # Start production server

# Code Quality (MANDATORY before commits)
npm run lint               # ESLint - must pass with zero errors
npm run typecheck          # TypeScript checking - must pass  
npm run format             # Format code with Prettier
npm run format:check       # Check code formatting

# Database (Supabase)
npm run supabase:test      # Test Supabase connection
npm run supabase:migrate   # Run database migrations
npm run supabase:tables    # List database tables
```

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required Variables
```bash
# Supabase (for database and auth)
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email service
RESEND_API_KEY=your_resend_api_key
```

### Optional Feature Flags
```bash
NEXT_PUBLIC_FLAG_STICKY_CTA=true
NEXT_PUBLIC_FLAG_EXIT_INTENT_OFFER=true
# ... see .env.example for all flags
```

## 🏢 Builder.io Development Environment

When working in Builder.io's development environment:

1. **Dev Server**: Automatically configured to run from `red-sovereign/`
2. **Environment**: Variables can be set via DevServerControl tool
3. **Live Preview**: Changes are reflected in real-time through iframe
4. **Directory Structure**: All commands automatically run in correct subdirectory

## 📁 Key Configuration Files

### `vercel.json` (Root)
- Configures deployment to point to `red-sovereign/` subdirectory
- Sets build and install commands with proper paths
- Handles API function timeouts

### `red-sovereign/next.config.ts`
- Next.js configuration for the application
- Handles cross-origin requests for iframe embedding
- Enforces ESLint and TypeScript during builds

### `red-sovereign/package.json`
- All project dependencies and scripts
- Build and development commands
- Quality control scripts (lint, typecheck, format)

## 🔄 Deployment Process

### Vercel (Production)
1. **Automatic**: Push to main branch triggers deployment
2. **Manual**: Use Vercel CLI or dashboard
3. **Build Process**: 
   - Runs from root directory
   - Installs dependencies in `red-sovereign/`
   - Builds application in `red-sovereign/`
   - Outputs to `red-sovereign/.next`

### Local Testing
```bash
cd red-sovereign

# Test production build locally
npm run build
npm run start
```

## 🐛 Troubleshooting

### Common Issues

#### "Multiple lockfiles" warning
- **Cause**: Conflicting `package-lock.json` files
- **Fix**: Ensure only `red-sovereign/package-lock.json` exists

#### "Non-standard NODE_ENV" warning  
- **Cause**: Environment variable conflicts
- **Fix**: Set `NODE_ENV=development` explicitly

#### Development server errors
- **Cause**: Running commands from wrong directory
- **Fix**: Always run commands from `red-sovereign/` directory

#### Cross-origin warnings
- **Cause**: iframe embedding in development environment
- **Fix**: Handled automatically by Next.js configuration

### Clean Reset
If you encounter persistent issues:

```bash
cd red-sovereign

# Clean build cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart development server
npm run dev
```

## 📋 Best Practices

### Code Quality
1. **Always run linting before commits**: `npm run lint`
2. **Type-check your code**: `npm run typecheck`
3. **Format consistently**: `npm run format`
4. **No build failures**: Both lint and typecheck must pass

### Development Workflow
1. **Work in feature branches**
2. **Test locally before pushing**
3. **Check production build**: `npm run build`
4. **Verify environment variables are set**

### Performance
- Development server typically takes 10-20s to start
- Hot reload works for most changes
- Full restart needed for config changes

## 🆘 Getting Help

- **Documentation**: Check `CLAUDE.md` for project-specific guidance
- **Issues**: Review error logs carefully, they're usually specific
- **Configuration**: Most issues stem from directory or environment problems
- **Performance**: Use `scripts/lighthouse-test.js` for performance audits

## 🎯 Development Goals

- **Lighthouse Score**: >95
- **Build Time**: <30 seconds  
- **Hot Reload**: <2 seconds
- **Zero Errors**: Lint and TypeScript must be clean
- **Code Quality**: Maintain high standards with automated checks
