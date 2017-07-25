{-# LANGUAGE OverloadedStrings #-}
  import Haste
  import Haste.Foreign
  import Haste.Prim (toJSStr)
  import Debug.Trace
  import Data.Typeable
  import Haste.Graphics.Canvas
  import Haste.DOM
  import Haste.Events
  import Data.IORef

  fun :: Int -> String -> IO String
  fun n s = return $ "vt2:The number is " ++ show n ++ " and the string is " ++ s

  myfun :: Int -> Int -> Int
  myfun a b | trace ("myfun " ++ show a ++ " " ++ show b) False = undefined
  myfun a b = a + b

  vtMsg :: () -> String
  vtMsg _ = "abc"

  listConvert :: [Int] -> Int
  listConvert a | trace("trace.listConvert " ++ show a) False = undefined
  listConvert _ = 1

  listCount ::  [Int] -> Int
  listCount a | trace("trace.listCount " ++ show (typeOf a) ++
     ": length2=" ++ show (length a)) False = undefined
  listCount a = length a

  treeCount ::  [[Int]] -> Int
  treeCount [] = 0
  treeCount (x:xs) = length x + treeCount xs

  isInt :: Float  -> Bool
  isInt x = x == fromInteger (round x)

  data FloatOrList = VtFloat Float | VtFloatList [Float]

  showCanvas ::  Canvas  -> String
  showCanvas c = "showCanvas:"

  instance Show Canvas where
    show a = "Canvas=" ++ show a

  instance Show Elem where
     show a= "Elem"

  doIt :: KeyEvent  -> IO [PaddleEvent]
  -- doIt :: KeyCode  -> IO [PaddleEvent]
  doIt k =  case k of
              -- 65 -> do
              --   -- writeLog "you pressed A"
              --   return [PaddleEventLeft 1]
              _ -> do
                return [PaddleEventNull 0]

  -- run :: PaddlePos -> [PaddleEvent] -> IO ()

  -- Note: this is called directly by legacy.js i.e. it's the main entry point
  animMain :: IO ()
  animMain =  do
      elems <- elemsByQS document "#canvas"
      -- writeLog $ "length elems=" ++ (show $ length elems)
      -- getCanvas works, but it's been deprecated
      -- Just can <- getCanvas $ elems !! 0
      Just canvas <- fromElem $ elems !! 0
      -- preventDefault
      -- onEvent can KeyUp $ \_ -> keyHandler
      onEvent canvas Click $ \_ -> mouseHandler
      -- onEvent canvas Click $ \_ -> mouseHandler
      -- onEventVt canvas Click $ \_ -> mouseHandler
      -- doIt :: KeyEvent k -> IO [PaddleEvent]
      -- doIt :: Int k -> Int
      -- doIt _ = 7
        -- case k of
        --   65 -> do
        --     writeLog "you pressed A"
        --     return [PaddleEventLeft 1]
        --   _ -> do
        --     return [PaddleEventNull]

      -- let tmp = canvas `onEvent` KeyDown $ doIt
      -- canvas `onEvent` KeyDown $ \k -> do
      -- -- document `onEvent` KeyDown $ \k -> do
      --   writeLog "keyDown called"
      --   case k of
      --     65 -> do
      --       writeLog "you pressed A"
      --       return [PaddleEventLeft 1]
      --     68 -> do
      --       writeLog "you pressed D"
      --       return [PaddleEventRight 1]
      --     -- 83 -> do
      --     --   writeLog "you pressed S"
      --     _ -> do
      --       -- return ()
      --       return [PaddleEventNull]
      -- animate  canvas  0 0
      renderState canvas initialState
      stateRef <- newIORef $ initialState
      animate2  canvas stateRef
      writeLog $ show 1
      writeLog "anim: back from animate"
    where
      mouseHandler = do
        writeLog $ "you clicked in canvas, coords="
        -- tmp <- mouseCoords
        -- writeLog "mouseHandler: done"
    --   + 1 1

  -- getPaddlePos :: Int -> Double
  getPaddlePos :: Int -> Int
  getPaddlePos _ = 20

  squareShape :: Shape ()
  squareShape = do
    rect (-20, -20) (20, 20)
    rect (-10, -10) (10, 10)
    line (-20, -20) (20, 20)

    -- | You can stroke any shape to get a "wireframe" version of them.
  square :: Picture ()
  square = stroke squareShape

  --vt add
  width, height,ballRadius, paddleWidth, paddleHeight :: Double
  width = 500 -- width of canvas
  height = 600 -- height of canvas
  ballRadius = 5 --radius of ball
  -- paddleHeight = 5 -- height of paddle
  paddleHeight = 15 -- height of paddle
  paddleWidth = 150 -- width of paddle
  halfWidth = width / 2 -- well, half the width
  halfHeight = height / 2 --also half the height

  -- paddleWidth = 150 -- width of paddle

  data GameState = GameState{
    ballPos :: Point, -- position of ball
    ballSpeed :: Point, -- how far will ball move in a single update
    paddlePos:: Double, -- start position of paddle on x axis
    score  :: Int
  }

  initialState :: GameState
  initialState = GameState{
  ballPos = (20, 20),
  ballSpeed = (8, 10),
  paddlePos = (300 / 2) - 75, --position around center of canvas
  -- paddlePos = 600 , --position around center of canvas
  score = 0
  }

  gamePicture :: GameState -> Picture ()
  gamePicture state = do
    let x1 = paddlePos state -- paddle start position
        x2 = x1 + paddleWidth -- end position of paddle
    paddle $ Rect x1 0 x2 paddleHeight -- top paddle
    paddle $ Rect x1 (height - paddleHeight) x2 height -- bottom paddle

  renderState :: Canvas -> GameState -> IO ()
  renderState canvas state = render canvas $ do
    gamePicture state

  paddleShape :: Shape ()
  paddleShape = rect (-20, -10) (20, 10)

  -- paddle :: Picture ()
  -- paddle = do
  --   fill paddleShape
  --   -- color (RGB 0 0 200) paddleShape

  white :: Picture () -> Picture ()
  white = color (RGB 255 255 255) -- or whichever color you like

  paddle :: Rect -> Picture ()
  paddle (Rect x1 y1 x2 y2) = white $ do
    fill $ rect (x1, y1) (x2, y2)


  data PaddlePos =
    PaddlePos Int
    deriving(Eq,Show)

  data PaddleEvent =
      PaddleEventLeft Int
    | PaddleEventRight Int
    | PaddleEventNull Int
    deriving(Eq,Show)

  paddleUpdate :: PaddlePos -> PaddleEvent -> PaddlePos
  paddleUpdate (PaddlePos p) (PaddleEventLeft a) = PaddlePos (p - a)
  paddleUpdate (PaddlePos p) (PaddleEventRight a) = PaddlePos (p + a)
  paddleUpdate dm _ = dm

  uiUpdate :: PaddlePos -> IO [PaddleEvent]
  uiUpdate (PaddlePos p) = do
    writeLog $ "Value is now: " ++ show p
    return [PaddleEventRight 1 ]
    -- writeLog $ "Value is now: "

  -- setPaddleColor :: Picture () -> Picture ()
  -- setPaddleColor p = color (RGB 0 0 200) p
  movePaddles :: (Int, Int) -> IORef GameState -> IO ()
  movePaddles (mouseX, mouseY) stateRef = do
    atomicModifyIORef stateRef (\state -> ((state {paddlePos = (fromIntegral mouseX) - (paddleWidth / 2)}), ()))

  moveBall :: GameState -> GameState
  moveBall state = state {ballPos = (x + vx, y + vy)} --increment by vx and vy
    where
      (x, y)   = ballPos state
      (vx, vy) = ballSpeed state

  --vt end

  animate :: Canvas -> Double -> Double -> IO ()
  -- animate _ _ | trace ("animate: canvas=") False = undefined
  animate canvas angle paddlePos = do
    -- writeLog "now in Animate"
    -- writeLog $ "msg" ++ show $ getPaddlePos 1
    -- writeLog $ "msg" ++ show  7
    -- writeLog $ "msg" ++ show (getPaddlePos 1)
    writeLog $ "msg" ++ show ( PaddlePos $ getPaddlePos 1)
    render canvas $ do
      translate (160, 160) $ rotate angle $ do
        square
        -- translate (100, 100) . rotate (-angle) . color (RGB 0 255 0) $ filledSquare
      --   translate (100, 100) . rotate (-angle) . color (RGB 0 255 0) $ square
      -- color (RGBA 255 0 255 0.5) . font "20px Bitstream Vera" $ do
      --   text (10, 160) "You can use transparency too!"
      -- translate (160 + getPaddlePos 1, 300) . color (RGB 0 0 200) $ paddle
      -- writeLog "msg" ++ read (show $ PaddlePos $ getPaddlePos 1)
      -- writeLog $ "msg"
      -- translate 160 + read (show $ PaddlePos $ getPaddlePos 1) :: Int, 300) . color (RGB 0 0 200) $ paddle
    setTimer (Once 10) $ animate canvas (angle + 0.02) paddlePos
    return ()

  animate2 :: Canvas -> IORef GameState -> IO ()
  animate2 canvas stateRef = do
    state <- readIORef stateRef -- extract state from reference object
    renderState canvas state -- draw game picture
    atomicWriteIORef stateRef $ update state -- update state and rewrite state reference^
    -- setTimer (Once 30) $ animate2 canvas stateRef  -- sleep. then loop
    setTimer (Once 10) $ animate2 canvas stateRef
    return ()
    where
      update = moveBall


  main = do
    export "fun" fun
    export "myfun" myfun
    export "listCount" listCount
    export "vtMsg" vtMsg
    export "listConvert" listConvert
    export "treeCount" treeCount
    export "isInt" isInt
    export "animMain" animMain
