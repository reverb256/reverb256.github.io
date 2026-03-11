#!/usr/bin/env python3
"""Test the Hyprand desktop simulation portfolio"""

from playwright.sync_api import sync_playwright
import sys

def test_hyprland_desktop():
    """Test the enhanced portfolio with Hyprland desktop simulation"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        console_messages = []
        def on_console(msg):
            console_messages.append({'type': msg.type, 'text': msg.text})
        page.on('console', on_console)

        # Navigate to the site
        print("📡 Loading http://localhost:4326...")
        page.goto('http://localhost:4326')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)  # Extra wait for libraries to initialize
        print("✅ Page loaded")

        # Test 1: Check CDN scripts are loaded
        print("\n🔍 Testing CDN libraries...")
        cdn_libraries = {
            'Howler': 'window.Howl',
            'interact': 'window.interact',
            'Terminal': 'window.Terminal',
            'PIXI': 'window.PIXI',
            'FitAddon': 'window.FitAddon'
        }

        for lib, global_obj in cdn_libraries.items():
            is_loaded = page.evaluate(f'typeof {global_obj} !== "undefined"')
            status = "✅" if is_loaded else "❌"
            print(f"  {status} {lib}: {'loaded' if is_loaded else 'NOT FOUND'}")

        # Test 2: Check desktop elements
        print("\n🖥️  Testing desktop elements...")
        desktop_elements = {
            'Desktop container': '#hyprland-desktop',
            'Matrix rain canvas': '#matrix-rain',
            'Waybar': '.waybar',
            'Workspaces': '.workspaces',
            'Window area': '#window-area',
            'Info window': '#window-info',
            'Terminal window': '#window-terminal',
            'Terminal container': '#terminal-container',
            'Waybar clock': '#waybar-clock',
            'Tray volume': '#tray-volume',
        }

        for name, selector in desktop_elements.items():
            exists = page.locator(selector).count() > 0
            status = "✅" if exists else "❌"
            print(f"  {status} {name}")

        # Test 3: Check xterm.js terminal is initialized
        print("\n💻 Testing xterm.js terminal...")
        term_initialized = page.evaluate('''
            () => {
                const termContainer = document.getElementById('terminal-container');
                if (!termContainer) return false;
                // Check if xterm.js has rendered the terminal
                return termContainer.querySelector('.xterm') !== null ||
                       termContainer.children.length > 0;
            }
        ''')
        print(f"  {'✅' if term_initialized else '❌'} Terminal initialized")

        # Test 4: Test terminal typing
        print("\n⌨️  Testing terminal input...")
        terminal_canvas = page.locator('#terminal-container canvas')
        if terminal_canvas.count() > 0:
            print("  ✅ Terminal canvas found")
            # Try to type in terminal
            page.keyboard.press('Tab')  # Should show help
            page.wait_for_timeout(500)
        else:
            print("  ⚠️  Terminal canvas not found (might need to click into terminal)")

        # Test 5: Check waybar content
        print("\n📊 Testing waybar content...")
        workspaces = page.locator('.workspace').all()
        print(f"  ✅ Workspaces: {len(workspaces)} found")

        clock_text = page.locator('#waybar-clock .clock-time').text_content()
        print(f"  ✅ Clock: {clock_text}")

        # Test 6: Test window elements
        print("\n🪟 Testing window decorations...")
        close_buttons = page.locator('.win-btn-close').all()
        minimize_buttons = page.locator('.win-btn-min').all()
        maximize_buttons = page.locator('.win-btn-max').all()
        print(f"  ✅ Close buttons: {len(close_buttons)}")
        print(f"  ✅ Minimize buttons: {len(minimize_buttons)}")
        print(f"  ✅ Maximize buttons: {len(maximize_buttons)}")

        # Test 7: Check for console errors
        print("\n📋 Console output...")
        errors = [msg for msg in console_messages if msg['type'] == 'error']
        warnings = [msg for msg in console_messages if msg['type'] == 'warning']

        if errors:
            print(f"  ❌ Errors ({len(errors)}):")
            for err in errors[:5]:  # Show first 5 errors
                print(f"     - {err['text'][:100]}")
        else:
            print("  ✅ No console errors")

        if warnings:
            print(f"  ⚠️  Warnings ({len(warnings)}):")
            for warn in warnings[:3]:
                print(f"     - {warn['text'][:100]}")

        # Test 8: Take screenshot
        print("\n📸 Taking screenshot...")
        page.screenshot(path='/tmp/hyprland_desktop.png', full_page=True)
        print("  ✅ Screenshot saved to /tmp/hyprland_desktop.png")

        # Summary
        print("\n" + "="*50)
        print("📊 TEST SUMMARY")
        print("="*50)

        all_elements_present = all(
            page.locator(sel).count() > 0
            for sel in desktop_elements.values()
        )
        all_libraries_loaded = all(
            page.evaluate(f'typeof {obj} !== "undefined"')
            for obj in cdn_libraries.values()
        )

        if all_elements_present and all_libraries_loaded and len(errors) == 0:
            print("✅ ALL TESTS PASSED!")
            return_code = 0
        else:
            if not all_libraries_loaded:
                print("❌ Some libraries failed to load")
            if not all_elements_present:
                print("❌ Some desktop elements missing")
            if errors:
                print("❌ Console errors detected")
            return_code = 1

        browser.close()
        return return_code

if __name__ == '__main__':
    sys.exit(test_hyprland_desktop())
