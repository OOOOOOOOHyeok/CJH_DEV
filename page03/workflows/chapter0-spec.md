---
description: Chapter 0 Loading Screen Specification - Interactive drag-based text reveal
---

# Chapter 0: Loading Screen Specification

## CONTEXT
- First interactive state of the website
- Loading-driven entry point
- No navigation available
- User interaction limited to drag input

## INITIAL STATE
- Screen is static
- One primary word group is partially visible (hidden on right side)
- One asterisk-like symbol (*) exists near the text
- Text is in an inactive state
- Symbol is idle

## USER INPUT
- Accept vertical drag gesture only
- Ignore click, tap, or horizontal input
- Drag should feel like "rolling" the text from right to left

## ON DRAG START
- Activate the asterisk-like symbol
- Symbol begins continuous rotation
- Rotation speed is proportional to drag velocity
- Rotation direction follows drag direction

## SYMBOL BEHAVIOR DURING DRAG
- The symbol moves along an invisible path
- The path loosely follows the contours of the text
- The symbol is allowed to overlap text characters
- Multiple rotations are allowed before alignment
- Movement must feel elastic, not rigid

## OVERLAP LOGIC
- When the symbol overlaps text outlines:
  - Trigger gradual color-change propagation along the text shape
  - Color-fill follows the symbol's movement path
  - Color change is progressive, not instant
  - Unvisited text remains inactive

## ACCUMULATION RULE
- Repeated overlap increases coverage
- Partial overlap does not complete a character
- Only full contour traversal completes a character
- Characters complete one by one, left to right

## TRANSITION PHASE
- As coverage increases:
  - Symbol motion tightens
  - Rotation amplitude decreases
  - Path radius collapses inward
- Symbol begins to converge toward the text baseline

## FINAL ALIGNMENT
- When all characters are fully filled:
  - Symbol snaps into alignment
  - Rotation slows and stops
  - Symbol merges visually with the text rhythm

## DIRECTIONAL SHIFT
- After completion:
  - Visual emphasis subtly shifts toward the right
  - Layout implies forward motion
  - User is primed for vertical scroll continuation

## EXIT CONDITION
- Drag input is released OR scroll threshold is reached
- Loading state ends
- Chapter 1 becomes scroll-active
- Chapter 0 does not repeat

## ACCESSIBILITY CONSTRAINT
- All visible text must maintain contrast ratio >= 4.5:1 throughout the interaction
- Color transitions must not reduce legibility at any intermediate state

## DESIGN INTENT
This interaction must communicate:
- Something is being revealed through effort
- Progress is earned, not automatic
- Meaning appears only after engagement

## EMOTIONAL TARGET
Not delight.
Not surprise.
Recognition.

## KEY INTERACTION FEEL
- Text hidden on the right side of the screen
- On drag, text "rolls in" from the right, following the drag gesture
- The asterisk symbol rolls alongside, guiding the reveal
