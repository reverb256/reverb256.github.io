# Task Completion Checklist

## Before Considering a Task Complete

### 1. Build Verification
```bash
cd astro-portfolio
bun run build
```
Ensure build succeeds without errors.

### 2. Testing
```bash
bun run preview    # In one terminal
bun run test       # In another terminal
```
All tests should pass. For visual changes:
- Use `bun run test:ui` to inspect changes
- Run browser-specific tests if needed

### 3. Code Quality
- **TypeScript**: No type errors (strict mode)
- **Linting**: No console errors in browser
- **Accessibility**: Check ARIA labels on new elements
- **Reduced Motion**: Verify animations respect prefers-reduced-motion

### 4. Visual Verification
- Load `http://localhost:4321` in browser
- Check all sections render correctly
- Test animations (if applicable)
- Verify terminal functionality (if terminal changes)

### 5. Browser Compatibility
- Test in Chromium (Chrome-like)
- Test in Firefox
- Test in WebKit (Safari-like)

## For Specific Task Types

### Adding Terminal Commands
1. Add command to switch/case in terminal logic
2. Add to `help` command output
3. Test autocomplete works
4. Test command history (arrow keys)
5. Verify output formatting

### Adding Projects to Work Section
1. Add to `projects` array
2. Verify status badge (active/learning)
3. Check tech stack tags render
4. Test hover effects

### Styling Changes
1. Check dark theme colors
2. Verify reduced motion support
3. Test on mobile (responsive)
4. Check hover states

### Animation Changes
1. Verify GSAP ScrollTrigger registered
2. Check `data-animate` attributes set
3. Test `data-delay` values
4. Respect prefers-reduced-motion

## Deployment (for your reference)

Site deploys via GitHub Pages:
- Push to main branch
- GitHub Actions builds and deploys
- Live at https://reverb256.ca

## When Something Fails

1. **Build fails**: Check TypeScript errors, missing imports
2. **Tests fail**: Run `bun run test:ui` to debug
3. **Visual issues**: Check browser dev tools console
4. **Terminal issues**: Verify command parsing, database entries
